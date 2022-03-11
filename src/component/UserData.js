import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Report2 from "./CustomComp/Report2";
import Report3 from "./CustomComp/Report3";

import { useDispatch, useSelector } from "react-redux";
import { userAction } from "../redux/actions/userAction";
import Report1 from "./CustomComp/Report1";

import { Button, FormControl } from "react-bootstrap";

function UserData() {
  const [userData, setuserData] = useState([]);
  const [openModal, setopenModal] = useState(false);
  const [openModal1, setopenModal1] = useState(false);
  const [openModal2, setopenModal2] = useState(false);
  const [Searchval, setSearchval] = useState("")


  const [close] = useState(true);
  const [selectedUser, setSelectedUser] = useState([]);
  
  const dispatch = useDispatch();

  const isLogin = useSelector((state) => state.isAuth);

  const callUserPage = async () => {
    try {
      const res = await fetch("/details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        }, body: JSON.stringify({
          token:token
        })
      });
      const data = await res.json();
      console.log(data);
      setuserData([...data]);
      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
    }
  };
  let token;

  useEffect(() => {
    token= localStorage.getItem("token")
    dispatch(userAction(true));
    callUserPage();
  }, []);



  return (
    <div>
      <FormControl style={{ width: "40%", position: "relative", left: "60vh", top: "4vh" }} type="search" placeholder="search" onChange={(e) => {
        setSearchval(e.target.value)
      }} />
      <form methods="POST">
        <table style={{ marginTop: "50px" }} className="table">
          <thead>
            <tr>
              <th scope="col">User ID</th>
              <th scope="col">Email</th>
              <th>Name</th>
              <th scope="col">Haematology</th>
              <th scope="col">Thyroid </th>
              <th scope="col">Glucometry</th>
            </tr>
          </thead>
          {isLogin && (
            <>
                  <tbody>

              {userData.filter((item,ind) => item.email.includes(Searchval.toLocaleLowerCase())).map((val, ind) => {
                return (

                    <tr key={val._id}>
                    <td>{val._id}</td>
                    <td>{val.email}</td>
                    <td>{val.name}</td>
                    <td> 
                      <Button
                        onClick={(e) => {
                          e.preventDefault();
                          setopenModal(true);
                          setSelectedUser(val);
                        }}
                        style={{ color: "black" }}
                        variant={val?.heamatology ? "primary" : "danger"}
                        disabled={!val?.heamatology}>
                        {val?.heamatology ? "view Details" : "N/A"}
                      </Button>
                    </td>
                    <td>
                      <Button
                        onClick={(e) => {
                          e.preventDefault();
                          setopenModal1(true);
                          console.log(val);
                          console.log(val, "---------> ssss");
                          setSelectedUser(val);
                        }}
                        style={{ color: "black" }}
                        variant={val?.thyroid ? "primary" : "danger"}
                        disabled={!val?.thyroid}>
                        {val?.thyroid ? "view Details" : "N/A"}
                      </Button>
                    </td>
                    <td>
                      <Button
                        onClick={(e) => {
                          e.preventDefault();
                          setopenModal2(true);
                          console.log(val);
                          console.log(val, "--------->");
                          setSelectedUser(val);
                        }}
                        style={{ color: "black" }}
                        variant={val?.glucometry ? "primary" : "danger"}
                        disabled={!val?.glucometry}>
                        {val?.glucometry ? "view Details" : "N/A"}
                      </Button>
                    </td>
                  </tr> 
                  
                  );
                })}
                </tbody>
            </>
          )}
        </table>
      </form>
      <Report1
        Backdrop={close}
        userData={selectedUser}
        open={openModal}
        setopenModal={setopenModal}
        handleClose={() => {
          setopenModal(false);
        }} />
      <Report2
        Backdrop={close}
        userData={selectedUser}
        open={openModal1}
        setopenModal={setopenModal1}
        handleClose={() => {
          setopenModal1(false);
        }} />
      <Report3
        Backdrop={close}
        userData={selectedUser}
        open={openModal2}
        setopenModal={setopenModal2}
        handleClose={() => {
          setopenModal2(false);
        }} />
    </div>
  );
}

export default UserData;

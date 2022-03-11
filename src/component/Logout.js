import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { userAction } from "../redux/actions/userAction";

function Logout() {
  const dispatch = useDispatch();

  const history = useHistory();
  useEffect(() => {
    dispatch(userAction(false));
    localStorage.clear();

  });

  return (
    <div>
      <h1>Looading... </h1>
    </div>
  );
}

export default Logout;

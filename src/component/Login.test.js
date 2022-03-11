/* eslint-disable testing-library/prefer-screen-queries */

import { fireEvent, queryAllByTestId, render} from "@testing-library/react"
import Login from "./Login"


describe("input field test for email",()=>{
    it("login render",()=>{
        let {queryAllByTestId}=render (<Login />)
        let input = queryAllByTestId("email")
        expect(input).toBeTruthy()
    })
    it("input onChange",()=>{
        let {queryAllByTestId}=render (<Login />)
        let input = queryAllByTestId("email")
        fireEvent.change(input,{target:{value:"testValue"}})
        expect(input.value).toBe("testValue")
    })
})

describe("input field test for password",()=>{
    it("login render",()=>{
        let {queryAllByTestId}=render (<Login />)
        let input = queryAllByTestId("password")
        expect(input).toBeTruthy()
    })
    it("input onChange",()=>{
        let{queryAllByTestId}=render (<Login />)
        let input = queryAllByTestId("password")
        fireEvent.change(input,{target:{value:"testValue"}})
        expect(input.value).toBe("testValue")
    })
})
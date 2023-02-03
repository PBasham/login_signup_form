import React, { useState } from 'react'

import * as usersServices from "../../utilities/users-services"
// componants --------------------------------------------------
import { ButtonOne } from "../Buttons/ButtonOne"

const LoginForm = (props) => {

    const { setUser, updateShowLogin, hashPassword } = props


    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    })

    const [errorMsg, setErrorMsg] = useState("")
    const [emailError, setEmailError] = useState(false)
    const [passError, setPassError] = useState(false)

    const handleFormOnChange = (evt) => {
        // This isn't best practice but I will update to useRef
        if (evt.target.name === "email" && emailError) setEmailError(false)
        if (evt.target.name === "password" && passError) setPassError(false)

        setCredentials((current) => {
            return { ...current, [evt.target.name]: evt.target.value }
        })
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault()
        setErrorMsg("")
        let userExist = await usersServices.checkEmail(credentials.email)
        console.log("CheckEmail Response: ", userExist)
        if (userExist === "NOT_EXISTS") {
            setErrorMsg("There is no account registered with this email.")
            setEmailError(true)
            return
        }
        //! move this into users-services or api instaed of here??? Probably
        const options = {
            email: credentials.email,
            password: await hashPassword(credentials.password),
        }

        try {
            const user = await usersServices.login(options)
            console.log("Login Response: ", user)
            setUser(user)
        } catch {
            setPassError(true)
            setErrorMsg(`Password was incorrect.`)
        }
    }

    return (
        <div className="form-container">
            <form autoComplete="on" onSubmit={handleSubmit}>
                {/* <label>Email</label> */}
                <input
                    className={`form-input ${emailError ? "input-error" : null}`}
                    type="email"
                    name="email"
                    placeholder="yourEmail@email.com"
                    value={credentials.email}
                    onChange={handleFormOnChange}
                    required />
                {/* <label>Password</label> */}
                <input
                    className={`form-input ${passError ? "input-error" : null}`}
                    type="password"
                    name="password"
                    placeholder="password"
                    value={credentials.password}
                    onChange={handleFormOnChange}
                    required />
                    {/* <ButtonOne text={"Log In"} verson={"two"} onClick={handleSubmit}  style={"auth-btn"}/> */}
                <button type="submit" className="btn auth-btn btn-v-two">Log In</button>
                <p className="error-message error-text">{errorMsg}</p>
            </form>
            <div className="alt-form-div">
                <p>Already signed up? <span className="auth-form-link" onClick={updateShowLogin}>Sign Up</span></p>
            </div>
        </div>
    )
}

export default LoginForm

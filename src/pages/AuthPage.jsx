import React, { useState } from 'react'
import { HmacSHA512 } from "crypto-js"
// Components --------------------------------------------------
import LoginForm from "../components/Auth/LoginForm.jsx"
import SignUpForm from "../components/Auth/SignUpForm.jsx"
// styling/misc --------------------------------------------------
import "../css/Auth.css"

const AuthPage = (props) => {
    const { setUser } = props
    const [showLogin, setShowLogin] = useState(true)

    // this will toggle between login / signup form
    const updateShowLogin = () => {
        setShowLogin(!showLogin)
    }

    const hashPassword = (password) => {
        let secret = "testSecretForHashing"
        return HmacSHA512(password, secret).toString()
    }

    /** Order of Operations
     * User Logs in
        * If account exist, log them in, otherwise that user doesn't exist!
     * User Creates Account
        * User enteres email, name, password
        * -> Send email to api /CheckEmail endpoint
        * if "Not_Exist" returns, 
            * Take user to page for verification code
            * then verification code will be emailed to the user.
            * The user will enter the verification code
                * /EmailConfirmation Endpoint will be sent with email and verification code
                * if this returns true
                    * Hash the user password and send the user object with other needed info to the /register api
                    * run /user enpoint to log in? Or bring them back to the login page?
     */

    return (
        <div className="form-wrapper">
            {showLogin ?
                <LoginForm setUser={setUser} updateShowLogin={updateShowLogin} hashPassword={hashPassword} />
                :
                <SignUpForm setUser={setUser} updateShowLogin={updateShowLogin} hashPassword={hashPassword} />

            }
        </div>
    )
}

export default AuthPage

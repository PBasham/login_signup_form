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

    const hashPassword = async (password) => {
        let secret = "testSecretForHashing"
        return HmacSHA512(password, secret).toString()
    }

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

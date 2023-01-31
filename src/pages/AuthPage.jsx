import React, { useState } from 'react'
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

    return (
        <div className="form-wrapper">
            {showLogin ?
                <LoginForm setUser={setUser} updateShowLogin={updateShowLogin} />
                :
                <SignUpForm setUser={setUser} updateShowLogin={updateShowLogin} />
            }
        </div>
    )
}

export default AuthPage

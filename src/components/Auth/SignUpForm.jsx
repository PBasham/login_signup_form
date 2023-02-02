import React, { useState } from 'react'

import * as usersServices from "../../utilities/users-services"

const SignUpForm = (props) => {

    const { setUser, updateShowLogin, hashPassword } = props

    const [waitingForVerification, setWaitingForVerification] = useState(false)

    const [verCodeError, setVerCodeError] = useState(false)

    const [credentials, setCredentials] = useState({
        email: "",
        full_name: "",
        new_password: "",
        new_hash: "",
        verification_code: "",
        srouce_of_business: "unknown",
        additional_info_for_source: "",
    })

    const [error, setError] = useState("")

    const handleFormOnChange = (evt) => {
        // This isn't best practice but I will update to useRef
        setCredentials((current) => {
            return { ...current, [evt.target.name]: evt.target.value }
        })
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault()
        // setWaitingForVerification(true)
        // return
        console.log(credentials)
        try {
            const response = await usersServices.checkEmail(credentials.email)
            console.log(response)
            if (response === "NOT_EXISTS") {
                setWaitingForVerification(true)
            }
        } catch {
            // set error for issue ie: "Login Failed" but make it actually a meaningful message
            setError(`TEMP MSG: There was an error creating the account.`)
        }
    }

    const checkVerificationCode = async (evt) => {
        evt.preventDefault()
        console.log(credentials.verification_code)

        const payload = {
            email: credentials.email,
            code_path: "CHECK_CODE",
            verification_code: credentials.verification_code,
        }

        try {
            const response = await usersServices.emailConfirmation(payload)
            if (response === "FAILURE") {
                setVerCodeError(true)
                setError("Verification Code is invalid.")
            }
        } catch {

        }

    }

    const handleRegisterUser = () => {
        //todo hash password
        //todo send user credentials with hashed password to the register function
        //todo send the user email and hash pass to the login api, or just pass it through the users-services
        //todo setUser
    }

    const [passwordValid, setPasswordValid] = useState(false)

    const validatePass = (evt) => {
        // check if the password has everything needed to pass check
        let passRGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        let result = passRGEX.test(evt.target.value)
        console.log(result)
        setPasswordValid(result)
        // return result
    }


    const disableBtn = !credentials.email.trim() || !credentials.new_password.trim() || !credentials.full_name.trim()

    return (
        <div className="form-container">
            {!waitingForVerification ?
                // make this a component as well?
                <>
                    <form autoComplete="on" onSubmit={handleSubmit}>
                        {/* <label>Email</label> */}
                        <input className="form-input" type="email" name="email" placeholder="yourEmail@email.com" value={credentials.email} onChange={handleFormOnChange} required />
                        {/* <label>Full Name</label> */}
                        <input className="form-input" type="name" name="full_name" placeholder="Full Name" value={credentials.full_name} onChange={handleFormOnChange} required />
                        {/* <label>Password</label> */}
                        <input className="form-input" type="password" name="new_password" placeholder="password" minLength={8} value={credentials.new_password}
                            onChange={(evt) => {
                                handleFormOnChange(evt)
                                validatePass(evt)
                            }}
                            required />
                        <p className={`password-message ${!passwordValid && credentials.new_password.trim() ? "pass-error" : null}`}>Password must be 8 characters long, contain 1 uppercase letter, symbol, and number.</p>
                        <button type="submit" className={`btn auth-btn ${disableBtn ? "disabledBtn" : null}`} disabled={disableBtn} >Create Account</button>
                        <p className="error-message">{error}</p>
                    </form>
                    <div className="alt-form-div">
                        <p>Already signed up? <span className="auth-form-link" onClick={updateShowLogin}>Log In</span></p>
                    </div>
                </>
                :
                // Turn this into a component
                <div className="verification-div">
                    <h1>A verification code has been sent to your email.</h1>
                    <form autoComplete="off" onSubmit={checkVerificationCode} >
                        <input className={`form-input ${verCodeError ? "input-error" : null}`} type="text" name="verification_code" placeholder="Verification Code" value={credentials.verification_code} onChange={handleFormOnChange} required />
                        <p className="error-message">{error}</p>
                        <button type="submit" className={`btn auth-btn ${disableBtn ? "disabledBtn" : null}`} disabled={disableBtn} >Continue</button>
                    </form>
                </div>
            }
        </div>
    )
}

export default SignUpForm

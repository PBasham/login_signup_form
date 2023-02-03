import React, { useState } from 'react'
import { useResolvedPath } from "react-router-dom"

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

    const [errorMsg, setErrorMsg] = useState("")
    const [generalMsg, setGeneralMsg] = useState("")

    const handleFormOnChange = (evt) => {
        // This isn't best practice but I will update to useRef
        setCredentials((current) => {
            return { ...current, [evt.target.name]: evt.target.value }
        })
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault()
        /** //! What Will i do?
         * Step 1: Check the users email.
         * Step 2: Send the user a verification code and move to that screen.
         * Step 3: Check the verification code that the user provided to make sure that it matches the given code
         * Step 4: register the user.
         */

        // Step 1
        try {
            const response = await usersServices.checkEmail(credentials.email)
            console.log(response)
            if (response === "NOT_EXISTS") {
                // Step 2


                if (sendVerificationCode()) {
                    setWaitingForVerification(true)
                } else {
                    setErrorMsg("Error sending verification code")
                    throw new Error()
                }
            } else {
                setErrorMsg("An account with this email already exist.")
            }
        } catch {
            // set error for issue ie: "Login Failed" but make it actually a meaningful message
            setErrorMsg(`TEMP MSG: There was an error creating the account.`)
        }
    }

    const sendVerificationCode = async () => {
        let response = await usersServices.sendVerificationCode({ email: credentials.email, code_path: "SEND_CODE_REGISTER" })
        if (response === "CODE_SENT") return true
        return false
    }
    const resendVerificationCode = () => {
        sendVerificationCode()
    }
    // Step 3
    const checkVerificationCode = async (evt) => {
        evt.preventDefault()
        setErrorMsg("")
        const payload = {
            email: credentials.email,
            code_path: "CHECK_CODE",
            verification_code: credentials.verification_code,
        }

        try {
            const response = await usersServices.emailConfirmation(payload)
            console.log(response)
            if (response === "FAILURE") {
                setVerCodeError(true)
                setErrorMsg("Verification Code is invalid.")
                return
            }
            // Step 4?
            handleRegisterUser()

        } catch {
            setErrorMsg("Something went wrong while checking your verification code.")
        }

    }

    const handleRegisterUser = async () => {
        credentials.new_hash = await hashPassword(credentials.new_password)
        try {

            let response = await usersServices.registerUser(credentials)
            console.log("response from registeruser")
            console.log(response)
        } catch {
            console.log("Something went wrong???")
            setErrorMsg("There was an error creating account.")
        }
        //todo setUser
    }

    const [passwordValid, setPasswordValid] = useState(false)

    const validatePass = (evt) => {
        // check if the password has everything needed to pass check
        let passRGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        let result = passRGEX.test(evt.target.value)
        setPasswordValid(result)
    }


    const disableBtn = !credentials.email.trim() || !passwordValid || !credentials.full_name.trim()

    return (
        <div className="form-container">
            {!waitingForVerification ?
                // make this a component as well?
                <>
                    <form autoComplete="on" onSubmit={handleSubmit}>
                        {/* <label>Email</label> */}
                        <input
                            className="form-input"
                            type="email"
                            name="email"
                            placeholder="yourEmail@email.com"
                            value={credentials.email} onChange={handleFormOnChange}
                            required />
                        {/* <label>Full Name</label> */}
                        <input
                            className="form-input"
                            type="name"
                            name="full_name"
                            placeholder="Full Name"
                            value={credentials.full_name} onChange={handleFormOnChange}
                            required />
                        {/* <label>Password</label> */}
                        <input
                            className={`form-input`}
                            type="password"
                            name="new_password"
                            placeholder="password"
                            minLength={8}
                            value={credentials.new_password}
                            onChange={(evt) => {
                                handleFormOnChange(evt)
                                validatePass(evt)
                            }}
                            required />
                        <p
                            className={`password-message 
                            ${!passwordValid && credentials.new_password.trim() ? "error-text" : null} 
                            ${passwordValid ? "success-text" : null}`}>
                            Password must be 8 characters long, contain 1 uppercase letter, symbol, and number.
                        </p>
                        <button
                            type="submit"
                            className={`btn auth-btn btn-v-two ${disableBtn ? "disabledBtn" : null}`}
                            disabled={disableBtn}
                        >Create Account
                        </button>
                        <p className="error-message">{errorMsg}</p>
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
                        <p className="error-message">{errorMsg}</p>
                        <button type="submit" className={`btn auth-btn btn-v-two ${disableBtn ? "disabledBtn" : null}`} disabled={disableBtn} >Continue</button>
                        <p>{generalMsg}</p>
                        <p>Didn't recieve the code? <span className="auth-form-link" onClick={resendVerificationCode} >Resend code</span></p>
                    </form>
                </div>
            }
        </div>
    )
}

export default SignUpForm

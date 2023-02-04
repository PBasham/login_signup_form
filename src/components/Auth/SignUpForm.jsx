import React, { useState } from 'react'
// functions --------------------------------------------------
import * as usersServices from "../../utilities/users-services"
// components --------------------------------------------------
import { VerificationCodeForm } from "./VerificationCodeForm"
// styling/misc --------------------------------------------------
import { Icon } from '@iconify/react';

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

    const [hidePass, setHidePass] = useState(true)

    const handleFormOnChange = (evt) => {
        // This isn't best practice but I will update to useRef
        setCredentials((current) => {
            return { ...current, [evt.target.name]: evt.target.value }
        })
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault()
        setErrorMsg("")

        try {
            const response = await usersServices.checkEmail(credentials.email)
            console.log(response)
            if (response === "NOT_EXISTS") {

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
            handleRegisterUser()

        } catch {
            setErrorMsg("Something went wrong while checking your verification code.")
        }

    }

    const handleRegisterUser = async () => {
        credentials.new_hash = await hashPassword(credentials.new_password)
        try {

            let response = await usersServices.registerUser(credentials)
            setWaitingForVerification(false)
            updateShowLogin()
        } catch {
            console.log("Something went wrong???")
            setErrorMsg("There was an error creating account.")
        }
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
                        <div className="input-pass-div">
                        <input
                            className={`form-input`}
                            type={hidePass ? "password" : "text" }
                            name="new_password"
                            placeholder="password"
                            minLength={8}
                            value={credentials.new_password}
                            onChange={(evt) => {
                                handleFormOnChange(evt)
                                validatePass(evt)
                            }}
                            required />
                            <Icon className={`input-pass-icon ${!hidePass ? "icon-active" : null}`} icon={`${hidePass ? "ph:eye-slash" : "ph:eye-bold"}`} onClick={() => setHidePass(!hidePass)} />
                            </div>
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
                        <p className="error-message error-text">{errorMsg}</p>
                    </form>
                    <div className="alt-form-div">
                        <p>Already signed up? <span className="auth-form-link" onClick={updateShowLogin}>Log In</span></p>
                    </div>
                </>
                :
                // Turn this into a component
                <VerificationCodeForm
                    credentials={credentials}
                    checkVerificationCode={checkVerificationCode}
                    handleFormOnChange={handleFormOnChange}
                    errorMsg={errorMsg}
                    disableBtn={disableBtn}
                    verCodeError={verCodeError}
                    generalMsg={generalMsg}
                    resendVerificationCode={resendVerificationCode}
                />
            }
        </div>
    )
}

export default SignUpForm

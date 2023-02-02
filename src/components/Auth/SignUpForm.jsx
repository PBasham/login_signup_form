import React, { useState } from 'react'

import * as usersServices from "../../utilities/users-services"

const SignUpForm = (props) => {

    const { setUser, updateShowLogin } = props

    const [waitingForVerification, setWaitingForVerification] = useState(false)


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
        } catch {
            // set error for issue ie: "Login Failed" but make it actually a meaningful message
            setError(`TEMP MSG: There was an error.`)
        }
    }

    const disableBtn = !credentials.email.trim() || !credentials.new_password.trim() || !credentials.full_name.trim()

    return (
        <div className="form-container">
            {!waitingForVerification ? <>
                <form autoComplete="on" onSubmit={handleSubmit}>
                    {/* <label>Email</label> */}
                    <input className="form-input" type="email" name="email" placeholder="yourEmail@email.com" value={credentials.email} onChange={handleFormOnChange} required />
                    {/* <label>Full Name</label> */}
                    <input className="form-input" type="name" name="full_name" placeholder="Full Name" value={credentials.full_name} onChange={handleFormOnChange} required />
                    {/* <label>Password</label> */}
                    <input className="form-input" type="password" name="new_password" placeholder="password" value={credentials.new_password} onChange={handleFormOnChange} required />
                    <p className="password-message">Password must be 8 characters long, contain 1 uppercase letter, symbol, and number.</p>
                    <button type="submit" className={`btn auth-btn ${disableBtn ? "disabledBtn" : null}`} disabled={disableBtn} >Create Account</button>
                    <p className="error-message">{error}</p>
                </form>
                <div className="not-a-user-div">
                    <p>Already signed up? <span className="auth-form-link" onClick={updateShowLogin}>Log In</span></p>
                </div>
            </>
                :
                <div>

                </div>
            }
        </div>
    )
}

export default SignUpForm

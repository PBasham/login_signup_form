import React, { useState } from 'react'
// import { request } from "express"

const SignUpForm = (props) => {

    const { setUser, updateShowLogin } = props


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
        console.log(credentials)
        const options = {
            method: "POST",
            // mode: "no-cors",
            headers: {
                email: credentials.email,
                code_path: "CHECK_EMAIL",
            }
        }
        try {
            // go to page for verification code?
            //? Q: How do these endpoint work, which points to which?
            // ? I see that /User logs in
            const response = await fetch("https://sicdemo.thedatagroup.io/api/CheckEmail", options)
            //  const response = await request({
            //     url: "https://sicdemo.thedatagroup.io/api/CheckEmail",
            //     method: "POST",
            //     json: {
            //         email: credentials.email,
            //         code_path: "CHECK_EMAIL",
            //     }
            //  })
            console.log("Response")
            console.log(response)
        } catch {
            // set error for issue ie: "Login Failed" but make it actually a meaningful message
            setError("There was an issue.")
        }
    }
    return (
        <div className="form-container">
            <form autoComplete="on" onSubmit={handleSubmit}>
                <label>Email</label>
                <input type="email" name="email" value={credentials.email} onChange={handleFormOnChange} required />
                <label>Full Name</label>
                <input type="name" name="full_name" value={credentials.full_name} onChange={handleFormOnChange} required />
                <label>Password</label>
                <input type="password" name="password" value={credentials.password} onChange={handleFormOnChange} required />
                <button type="submit" className="btn auth-btn">Create Account</button>
                <p>{error}</p>
            </form>
            <div className="not-a-user-div">
                <p>Already signed up? <span className="auth-form-link" onClick={updateShowLogin}>Log In</span></p>
            </div>
        </div>
    )
}

export default SignUpForm

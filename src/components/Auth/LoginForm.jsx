import React, { useState } from 'react'

const LoginForm = (props) => {

    const { setUser, updateShowLogin } = props


    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    })

    const [error, setError] = useState("")

    const handleFormOnChange = (evt) => {
        setCredentials((current) => {
            return { ...current, [evt.target.name]: evt.target.value }
        })
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault()
        try {
            // api call to login
        } catch {
            // set error for issue ie: "Login Failed" but make it actually a meaningful message
        }
    }

    return (
        <div className="form-container">
            <form autoComplete="on" >
                <label>Email</label>
                <input type="email" name="email" value={credentials.email} onChange={handleFormOnChange} required />
                <label>Password</label>
                <input type="password" name="password" value={credentials.password} onChange={handleFormOnChange} required />
                <button type="submit" className="auth-btn">Log In</button>
            </form>
        </div>
    )
}

export default LoginForm

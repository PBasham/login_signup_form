import React from 'react'

export const VerificationCodeForm = (props) => {

    const {
        credentials,
        errorMsg,
        generalMsg,
        disableBtn,
        verCodeError,
        checkVerificationCode,
        resendVerificationCode,
        handleFormOnChange,
    } = props

    return (
        <div className="verification-div">
            <h1>A verification code has been sent to your email.</h1>
            <form autoComplete="off" onSubmit={checkVerificationCode} >
                <input
                    className={`form-input ${verCodeError ? "input-error" : null}`}
                    type="text"
                    name="verification_code"
                    placeholder="Verification Code"
                    value={credentials.verification_code}
                    onChange={handleFormOnChange}
                    required />
                <p className="error-message error-text">{errorMsg}</p>
                <button
                    type="submit"
                    className={`btn auth-btn btn-v-two ${disableBtn ? "disabledBtn" : null}`}
                    disabled={disableBtn}
                >Continue</button>
                <p>{generalMsg}</p>
                <p>Didn't recieve the code? <span className="auth-form-link" onClick={resendVerificationCode} >Resend code</span></p>
            </form>
        </div>
    )
}
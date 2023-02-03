/** //TODO
 * login -- Password takes hmac sha512 hash
 * register new_hase takes hmac sha512 hash
 */
/*========================================
        This will have functions for login,signup,verify ect..
========================================*/
import * as usersAPI from "./users-api.js"

// check if email exist in database
export async function checkEmail(userEmail) {
    /* payload { 
        email: "", 
        code_path: "CHECK_EMAIL"
    } */
    const response = await usersAPI.checkEmail(userEmail)
    return response
}
// sends verification code to email
export async function sendVerificationCode(userData) {
    /* payload { 
        email: "", 
        code_path: "CHECK_EMAIL",
    } */
    console.log("==users-services sendVerification==")
    const response = await usersAPI.emailConfirmation(userData)
    return response
}
// check  if verification code user provided matches the one sent to them.
export async function emailConfirmation(userData) {
    /* payload { 
        email: "", 
        code_path: "CHECK_CODE", 
        verification_code: "SEND_CODE_REGISTER"
    } */
    const response = await usersAPI.emailConfirmation(userData)
    // then this would call registerUser?
    return response
}

// register the user
export async function registerUser(userData) {
    /* payload {
        email: "", 
        full_name: "", 
        new_password: "", 
        new_hash: "", 
        verification_code: "", 
        source_of_business: "unknown", 
        additional_info_for_source: "" 
    }*/
    // Creates a new user account
    const response = await usersAPI.registerUser(userData)
    return response
}

// verify user credentials and returns a user objext and session ID
export async function login(userCredentials) {
    // payload {email: "", password: ""}
    const token = await usersAPI.login(userCredentials)
    console.log(token)
    if (token.role === "GUEST") {
        localStorage.setItem("token", JSON.stringify(token)) // set user token for session in localstorage
    } else {
        throw new Error()
    }

    return getUser() // get the users token and set them as a user in state (React)
}


// user-services helper functions --------------------------------------------------
export function getToken() {
    console.log("==users-services getToken()==")
    const token = localStorage.getItem("token")
    if (!token) {
        return null

    }
    return token
}

export function getUser() {
    console.log("==users-services getUser()==")
    const token = getToken()
    return token ? JSON.parse(token).email : null
}
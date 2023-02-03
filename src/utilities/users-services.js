/** TODO
 * login -- Password takes hmac sha512 hash
 * register new_hase takes hmac sha512 hash
 */
/*========================================
        This will have functions for login,signup,verify ect..
========================================*/
import * as usersAPI from "./users-api.js"

// check if email exist in database
export async function checkEmail(userEmail) {
    // { email: "", code_path: "CHECK_EMAIL"}
    // check if an account in the database has that email address, if it doesn't, sends a verification code to the email
    const response = await usersAPI.checkEmail(userEmail)
    return response
}
// check if verification code is correct
export async function emailConfirmation(userData) {
    // { email: "", code_path: "CHECK_CODE", verification_code: ""}
    // Checks if a verificaton code is valid
    const response = await usersAPI.emailConfirmation(userData)
    // then this would call registerUser?
    return response
}

// register the user
export async function registerUser(userData) {
    // {email: "", full_name: "", new_password: "", new_hash: "", verification_code: "", source_of_business: "unknown", ""additional_info_for_source: "" }
    // Creates a new user account
    const response = await usersAPI.registerUser(userData)
}

// verify user credentials and returns a user objext and session ID
export async function login(userCredentials) {
    // {email: "", password: ""}
    console.log("==users-services login()==")
    const token = await usersAPI.login(userCredentials)
    console.log(token)
    if (token.email === userCredentials.email && token.password === userCredentials.password) {
        // if this user exist then create JWT for them and return that token
        // localStorage.setItem("token", JSON.stringify(token))
    } else {
        throw new Error()
    }

    // return getUser()
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
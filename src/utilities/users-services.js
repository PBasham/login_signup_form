/*========================================
        This will have functions for login,signup,verify ect..
========================================*/

import * as usersAPI from "./users-api.js"

// check if email exist in database
export async function checkEmail(userEmail) {
    // { email: "", code_path: "CHECK_EMAIL"}
    // check if an account in the database has that email address, if it doesn't, sends a verification code to the email
    const response = await usersAPI.checkEmail(userEmail)
    console.log("Response:")
    console.log(response)
}
// check if verification code is correct
export async function emailConfirmation(userData) {
    // { email: "", code_path: "CHECK_CODE", verification_code: ""}
    // Checks if a verificaton code is valid
    const response = await usersAPI.emailConfirmation(userData)
    console.log("Response:")
    console.log(response)
}

// register the user
export async function registerUser(userData) {
    // {email: "", full_name: "", new_password: "", new_hash: "", verification_code: "", source_of_business: "unknown", ""additional_info_for_source: "" }
    // Creates a new user account
    const response = await usersAPI.registerUser(userData)
    console.log("Response:")
    console.log(response)
}

// verify user credentials and returns a user objext and session ID
export async function login(userCredentials) {
    // {email: "", password: ""}
    console.log("==users-services==")
    console.log("im at login function")
    const token = await usersAPI.login(userCredentials)
    localStorage.setItem("token", token)
    return getUser()
}


// user-services helper functions --------------------------------------------------
export function getToken() {
    console.log("-- I've reached getToken() in users-services")
    const token = localStorage.getItem("token")
    if (!token) return null
    const payload = JSON.parse(window.atob(token.split(".")[1]))
    if (payload.exp < Date.now() / 1000) {
        localStorage.removeItem("token")
        return null
    }
    return token
}

export function getUser() {
    console.log("--I've reached getUser in users-services")
    const token = getToken()
    return token ? JSON.parse(window.atob(token.split(".")[1])).user : null
}
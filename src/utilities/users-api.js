/*========================================
        This will hold all of the routes for the api and their payload
========================================*/

import sendRequest from "./send-request";

// set base url
const BASE_URL = "https://sicdemo.thedatagroup.io/api"

export function checkEmail(userEmail) {
    return sendRequest(`${BASE_URL}/CheckEmail`, "POST", {
        email: userEmail,
        code_path: "CHECK_EMAIL",
    })
}

export function emailConfirmation(userData) {
    return sendRequest(`${BASE_URL}/EmailConfirmation`, "POST", userData)
}
export function registerUser(userData) {
    return sendRequest(`${BASE_URL}/Register`, "POST", userData)
}
export function login(userCredentials) {
    console.log("==users-api login()==")
    return sendRequest(`${BASE_URL}/User`, "POST", userCredentials)
}
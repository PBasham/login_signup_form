/*========================================
        This will have functions for login,signup,verify ect..
========================================*/

// check if email exist in database
export async function checkEmail(userEmail) {
    // { email: "", code_path: "CHECK_EMAIL"}
    // check if an account in the database has that email address, if it doesn't, sends a verification code to the email

}
// check if verification code is correct
export async function emailConfirmation(userData) {
    // { email: "", code_path: "CHECK_CODE", verification_code: ""}
    // Checks if a verificaton code is valid
}

// register the user
export async function registerUser(userData) {
    // {email: "", full_name: "", new_password: "", new_hash: "", verification_code: "", source_of_business: "unknown", ""additional_info_for_source: "" }
    // Creates a new user account
}

// verify & login the user
export async function login(userCredentials) {
    // {email: "", password: ""}
    // verify user credentials and returns a user objext and session ID
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
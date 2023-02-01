

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
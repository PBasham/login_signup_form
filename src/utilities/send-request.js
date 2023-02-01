import { getToken } from "./users-services"

export default async function sendRequest(url, method = "GET", payload = null) {
    const options = { method }

    if (payload) {
        options.headers = { "Content-Type": "application/json" }
        options.body = JSON.stringify(payload)
    }
    const token = getToken()

    if (token) {
        options.headers = options.headers || {}
        options.headers.Authorization = `Bearer ${token}`
    }
    console.log("url: ", url)
    console.log("options: ", options)

    const response = await fetch(url, options)

    console.log(`Responded with ${response} from fetch at: ${url}.`)

    if (response.ok) return response.json()
    throw new Error("Bad Request")
}
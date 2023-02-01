import { getToken } from "./users-services"

export default async function sendRequest(url, method = "GET", payload = null) {
    console.log("==SendRequest==")
    const options = { method }

    if (payload) {
        options.headers = {
            "Content-Type": "application/json",
            // "access-control-allow-origin": "*",
            // 'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            // 'Access-Control-Allow-Methods': '*',
        }
        options.body = JSON.stringify(payload)
    }
    const token = getToken()

    console.log("Token: ", token)

    if (token) {
        options.headers = options.headers || {}
        options.headers.Authorization = `Bearer ${token}`
    }
    console.log("url: ", url)
    console.log("options: ", options)

    const response = await fetch(url, options)
    // .catch(console.error)

    console.log("Response")
    console.log(response)
    // console.log(`Responded with ${response} from fetch at: ${url}.`)

    if (response.ok) return response.json()
    throw new Error("Bad Request")
}
// dependencies --------------------------------------------------
import { useState } from "react"
// pages/components --------------------------------------------------
import AuthPage from "./pages/AuthPage"
// styling/misc --------------------------------------------------
import "./css/App.css"


function App() {

    // ! set useState for user -- check if there is a token stored in localstorage for a session
    const [user, setUser] = useState(false) // Need this to use function to check localStorage when clicked

    return (
        <div className="App">
            {user ?
                <h1>You've logged in!</h1>
                :
                <AuthPage setUser={setUser} />
            }
        </div>
    )
}

export default App

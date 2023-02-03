// dependencies --------------------------------------------------
import { useState } from "react"
// pages/components --------------------------------------------------
import AuthPage from "./pages/AuthPage"
// styling/misc --------------------------------------------------
import "./css/App.css"
import "./css/Buttons.css"
import { getUser } from "./utilities/users-services"
import HomePage from "./pages/HomePage"


function App() {

    // set useState for user -- check if there is a token stored in localstorage for a session
    const [user, setUser] = useState(getUser()) // Need this to use function to check localStorage when clicked

    return (
        <div className="App">
            {user ?
                <HomePage setUser={setUser} />
                :
                <AuthPage setUser={setUser} />
            }
        </div>
    )
}

export default App

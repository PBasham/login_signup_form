// dependencies --------------------------------------------------
import { useState } from "react"
// pages/components --------------------------------------------------
import AuthPage from "./pages/AuthPage"
import HomePage from "./pages/HomePage"

import { getUser } from "./utilities/users-services"
// styling/misc --------------------------------------------------
import "./css/App.css"
import "./css/pages/HomePage.css"
import "./css/Buttons.css"


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

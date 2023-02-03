import React from 'react'
import { ButtonOne } from "../components/Buttons/"
// users services logout functions --------------------------------------------------
import * as usersServices from "../utilities/users-services.js"
// components --------------------------------------------------
// import { ButtonOne } from "../components/Buttons"

const HomePage = (props) => {
    const { setUser } = props

    const handleLogout = () => {
        usersServices.logOut()
        setUser(null)
    }
    return (
        <div className="page-wrapper-home">
            <h1>HomePage</h1>
            <ButtonOne text={"LogOut"} version={"two"} onClick={handleLogout} />
        </div>
    )
}

export const FormButton = (props) => {

}


export default HomePage
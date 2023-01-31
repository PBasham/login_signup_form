import React from 'react'
// Components --------------------------------------------------
import LoginForm from "../components/User/LoginForm.jsx"
import SignUpForm from "../components/User/SignUpForm.jsx"

const UserForm = () => {
  return (
    <div className="">
      {/* need login / registration page */}
      <LoginForm />
      <SignUpForm />
    </div>
  )
}

export default UserForm

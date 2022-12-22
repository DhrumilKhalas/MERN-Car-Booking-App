import React from 'react'
import {useNavigate} from "react-router-dom"

const Error = () => {
    const navigate = useNavigate()
  return (
    <div className='errmain'>
    <h2>Oops! Page Not Found</h2>
    <button onClick={navigate(-1)}>GO TO PREVIOUS PAGE</button>
    <button onClick={navigate("/")}>GO TO HOME PAGE</button>
    </div>
  )
}

export default Error
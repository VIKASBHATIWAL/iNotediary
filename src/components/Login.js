import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

const Login =  ({showAlert}) => {
  const navigate = useNavigate();

  const host = "http://localhost:5000"





  const [credentials, setCredentials] = useState({

    email:"", 
    password:""
  })


  const handleChange = (e)=>{

setCredentials({...credentials, [e.target.name]: e.target.value})
  }

const handlesubmit = async (e)=>{
e.preventDefault();
const response = await fetch(`${host}/api/auth/login`, {
  method: 'POST', 
  
  headers: {
    'Content-Type': 'application/json',
  },
  body:JSON.stringify({email:credentials.email, password:credentials.password})

 });

 const json = await response.json()
showAlert("Succesfully logged in", "success")

if(json.success){
  localStorage.setItem("auth-token", json.authToken)
  navigate("/")
}
else{
showAlert("Invalid Credentials", "danger")}

}

  return (
  <>
<div className="container" style={{width:"900px"}}>
 <form className='my-3' onSubmit={handlesubmit}>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" value={credentials.email} onChange={handleChange} />
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={handleChange} />
  </div>
 
  <button type="submit" className="btn btn-primary">Submit</button>
</form></div>

</>
  )
}

export default Login

import React, {useState} from 'react'
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  const navigate = useNavigate();

  const host = "http://localhost:5000"





  const [credentials, setCredentials] = useState({
name:"",
    email:"", 
    password:""  })


  const handleChange = (e)=>{

setCredentials({...credentials, [e.target.name]: e.target.value})
  }

const handleSubmit = async (e)=>{
e.preventDefault();
const response = await fetch(`${host}/api/auth/createuser`, {
  method: 'POST', 
  
  headers: {
    'Content-Type': 'application/json',
  },
  body:JSON.stringify({name:credentials.name, email:credentials.email, password:credentials.password})

 });

 const json = await response.json()
console.log(json);

if(json.success){
  localStorage.setItem("auth-token", json.authToken)
  navigate("/")
  props.showAlert("Account created successfully", "success")
}
else{
props.showAlert("Invalid Credentials", "danger")
}

}

  return (
    <div className="container" style={{width:"900px"}}>

    <form onSubmit={handleSubmit}>
 <div className="mb-3">
      <label htmlFor="name" className="form-label">Name</label>
      <input type="text" className="form-control" id="name" name="name"  aria-describedby="emailHelp" onChange={handleChange}/>
    </div>

    <div className="mb-3">
      <label htmlFor="email" className="form-label">Email address</label>
      <input type="email" className="form-control" id="email" name="email"  aria-describedby="emailHelp" onChange={handleChange}/>
    </div>
    <div className="mb-3">
      <label htmlFor="password" className="form-label">Password</label>
      <input type="password" className="form-control" id="password" name="password"  onChange={handleChange} minLength={5} required/>
    </div>
  
   
    <button type="submit" className="btn btn-primary">Submit</button>
  </form>
  </div>
  )
}

export default Signup

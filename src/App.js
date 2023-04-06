import React, { useState } from "react"
import Navbar from "./components/Navbar";
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import About from "./components/About";
import Home from "./components/Home";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
function App() {


const [alert, setAlert] = useState(null)

const showAlert = (message, type)=>{
setAlert({
  msg:message,
  type:type
  })
  setTimeout(()=>{
    setAlert(null)
  }, 2000)
}


  return (
    <>
      <NoteState >
        <Router>
          <Navbar showAlert={showAlert} />
          <Alert alert={alert} />
          <Routes>
            <Route path="/" element={<Home showAlert={showAlert} />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login showAlert={showAlert} />} />
            <Route path="/signup" element={<Signup showAlert={showAlert} />} />

          </Routes>
        </Router>
      </NoteState>
    </>
  );
}

export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ChatRoom from "./components/ChatRoom";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";

function App(){
  const [jwt,setJwt] = React.useState(localStorage.getItem("jwt"));

  return(
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/login" element={<LogIn onLogin={token =>{
          setJwt(token)
        }}/>}/>
        <Route 
        path="/chat" 
        element={
          jwt
            ? <ChatRoom jwt={jwt} />
            : <Navigate to='/login' replace/>
        }
        />
        <Route path="*" element={<Navigate to='login/' replace></Navigate>}/>
      </Routes>
    </Router>
  )
}

export default App;
import React from 'react'
import {Link} from "react-router-dom"
function TopNavigation() {
  return (
    <div className="App">
      <nav>
         <Link to="/desktop">Desktop</Link>
        <Link to="/messages">Messages</Link> 
        <Link to="/leaves">Leaves</Link>
        <Link to="/tasks">Tasks</Link>
        <Link to="/leaves">Leaves</Link>
        <Link to="/editProfile">EditProfile</Link>
        <Link to="/" onClick={()=>{
          localStorage.clear();
        }}>SignOut</Link>
      </nav>
    </div>
  )
}

export default TopNavigation

import React, { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

function Login() {

  let dispatch = useDispatch();

   useEffect(() => {
     if ( localStorage.getItem("token") ) {
        validateToken();
    }},[]);

    let navigate = useNavigate();
    let emailInputRef =useRef();
    let passwordInputRef = useRef();

      let validateToken = async ()=>{
        let dataToSend = new FormData()
        dataToSend.append("token",localStorage.getItem("token") );
         let reqOptions={
            method:"post",
            body:dataToSend,
         }
         let JSONData = await fetch("/validate",reqOptions);
         let JSOData =  await JSONData.json();
         console.log(JSOData);
         alert(JSOData.msg);
         if (JSOData.status === "Success") {
             dispatch({type:"login",data:JSOData.data});
            navigate('/desktop');
         }
    }

    let validatingCred = async ()=>{
        let dataToSend = new FormData()
         dataToSend.append("email",emailInputRef.current.value);
         dataToSend.append("password",passwordInputRef.current.value);

         let reqOptions={
            method:"post",
            body:dataToSend,
         }

         let JSONData = await fetch("/login",reqOptions);

         let JSOData =  await JSONData.json();

         console.log(JSOData);
         alert(JSOData.msg);

         if (JSOData.status === "Success") {
             dispatch({type:"login",data:JSOData.data});
            localStorage.setItem("token",JSOData.data.token);
            navigate('/desktop');
         }

    }

    
  return (
    <div className="App">
        <h1>Login</h1>
      <form style={{width:"350px",height:"150px"}}>
        <div>
            <label>Email</label>
            <input type='email' ref={emailInputRef}></input>
        </div>

          <div>
            <label>password</label>
            <input type='password' ref={passwordInputRef}></input>
        </div>

    <div>
        <button type="button" onClick={()=>{
            validatingCred();
        }}>login</button>
    </div>

      </form>
      <br></br>
      <Link to="/signup">signup</Link>
    </div>
  )
}

export default Login

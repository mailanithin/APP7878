import React, { useEffect, useRef, useState } from 'react';
import TopNavigation from './TopNavigation';
import {useSelector} from "react-redux";

function EditProfile() {

  let userDetails = useSelector((store)=>{
      return store.userDetails
  })

  useEffect(()=>{
       firstNameInputRef.current.value=userDetails.firstName;
       lastNameInputRef.current.value=userDetails.lastName;
       ageInputRef.current.value=userDetails.age;
       genderInputRef.current.value=userDetails.gender;
       emailInputRef.current.value=userDetails.email;
       mobileNoInputRef.current.value=userDetails.mobileNo;
     setProfile(`/images/${userDetails.profilePic}`);

  },[])

  let [profile, setProfile] = useState("https://i.pinimg.com/736x/03/39/01/033901a8787e9dfcf74d80cf75bc3d60.jpg");
    let firstNameInputRef =useRef();
    let lastNameInputRef = useRef();
    let ageInputRef = useRef();
    let genderInputRef = useRef();
    let emailInputRef = useRef();
    let passwordInputRef = useRef();
    let mobileNoInputRef = useRef();
    let profilePicInputRef=useRef();
  
   let updatingData = async ()=>{
       let dataToSend = new FormData()
       dataToSend.append("firstName",firstNameInputRef.current.value);
       dataToSend.append("lastName",lastNameInputRef.current.value);
       dataToSend.append("age",ageInputRef.current.value);
       dataToSend.append("gender",genderInputRef.current.value); 
       dataToSend.append("email",emailInputRef.current.value);
       dataToSend.append("password",passwordInputRef.current.value);
       dataToSend.append("mobileNo",mobileNoInputRef.current.value);
       dataToSend.append("profilePic",profilePicInputRef.current.files[0]);
  
       let reqOptions = {
         method:"PATCH",
         body:dataToSend,
        }
       let JSONData = await fetch("/modified",reqOptions);
       let JSOData = await JSONData.json();
         console.log(JSOData.msg);
      }      

  return (
    <div className="App">
      <TopNavigation></TopNavigation>
        <h1>EditProfile</h1>
     <form>

      <div>
        <label>FirstName</label>
        <input ref={firstNameInputRef}></input>
      </div>

        <div>
        <label>LastName</label>
        <input ref={lastNameInputRef}></input>
      </div>

        <div>
        <label>Age</label>
        <input type='"number'  ref={ageInputRef}></input>
      </div>

        <div>
        <label>Gender</label>
        <input  ref={genderInputRef}></input>
      </div>

        <div>
        <label>Email</label>
        <input type='email'  ref={emailInputRef} readOnly></input>
      </div>

        <div>
        <label>Password</label>
        <input type='password'  ref={passwordInputRef}></input>
      </div>

        <div>
        <label>MobileNo</label>
        <input type='"number'  ref={mobileNoInputRef}></input>
      </div>

      <div>
        <label>Profile</label>
        <input type='file'  ref={profilePicInputRef} onChange={(eo)=>{
          let selectedPath = URL.createObjectURL(eo.target.files[0]);
          setProfile(selectedPath);
        }}></input>
      </div>

       <div>
        <img src={profile} alt=''></img>
       </div>

      <div>
        <button type='button' onClick={()=>{
        updatingData();
        }}>EditProfile</button>
      </div>

     </form>
     <br></br>
   
    </div>
  )
}

export default EditProfile

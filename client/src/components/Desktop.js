import React from 'react'
import { useSelector } from 'react-redux'
import TopNavigation from './TopNavigation'


function Desktop() {
  let userDetails = useSelector((store)=>{
    return store.userDetails
  })
 
  let deletingAccount = async()=>{
    let dataToSend = new FormData();
    dataToSend.append("email",userDetails.email)

    let reqOptions={
      method:"DELETE",
      body:dataToSend
    }
    let JSONData = await fetch("/remove",reqOptions);
    let JSOData = await JSONData.json();
    console.log(JSOData.msg)
    alert(JSOData.msg)
  }

  return (
    <div>
     <TopNavigation></TopNavigation>
      <h1>Welcome to Desktop</h1>
      <p>{userDetails.firstName}{userDetails.lastName}</p>
      <p>{`/images/${userDetails.profilePic}`}</p>
      <button onClick={()=>{
        deletingAccount();
      }}>Deleted</button>
    </div>
  )
}

export default Desktop

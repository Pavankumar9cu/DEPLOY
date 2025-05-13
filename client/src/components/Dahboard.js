import React from 'react'
import { useSelector } from 'react-redux'
import TopNavigation from './TopNavigation';

function Dahboard() {
    let storeObj = useSelector((store)=>{
        console.log(store)
        return store;

    })
  return (
    <div>
        <TopNavigation></TopNavigation>
      <h1>Dashboars</h1>
      <h2>{storeObj.loggedInUser.firstName} {storeObj.loggedInUser.lastName}</h2>
      <img src={`http://localhost:1001/${storeObj.loggedInUser.profilePic}`} ></img>

    </div>
  )
}

export default Dahboard

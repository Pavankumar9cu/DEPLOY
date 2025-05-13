import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

function TopNavigation() {
    let navigate = useNavigate()
    let storeObj = useSelector((store)=>{
        return store.loggedInUser;
    });
    useEffect(()=>{
        console.log(storeObj)
        if(storeObj && storeObj.email){
            navigate("/dashboard");
         
        }else{
            navigate("/");
        }
    },[])

  return (
    <div>
        <nav>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/tasks">Tasks</Link>
            <Link to="/">SignOut</Link>

        </nav>
      
    </div>
  )
}

export default TopNavigation

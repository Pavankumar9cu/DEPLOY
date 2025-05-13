import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";

function Signup() {
  let firstNameInputRef = useRef();
  let lastNameInputRef = useRef();
  let ageInputRef = useRef();
  let emailInputRef = useRef();
  let passwordInputRef = useRef();
  let mobileInputRef = useRef();
  let profilePicInputRef = useRef();
  let [profilePicPath, setProfilePicPath] = useState(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTML0gExaohZHdZW3609F12nUmVc14WXYNx_w&s"
  );

  let signUpDataSend = async () => {
    let JSODataSend = {
      firstName: firstNameInputRef.current.value,
      lastName: lastNameInputRef.current.value,
      age: ageInputRef.current.value,
      email: emailInputRef.current.value,
      password: passwordInputRef.current.value,
      mobile: mobileInputRef.current.value,
      profilePic: profilePicInputRef.current.value,
    };
    let JSONDataSend = JSON.stringify(JSODataSend);

    let myHeasers = new Headers();
    myHeasers.append("content-type", "application/json");

    let reqOptions = {
      method: "POST",
      headers: myHeasers,
      body: JSONDataSend,
    };

    let JSONData = await fetch("http://localhost:1001/signup", reqOptions);
    let JSOData = await JSONData.json();
    console.log(JSOData);
  };

  let signUpURLENCCODED = async () => {
    let URLDataSend = new URLSearchParams();
    URLDataSend.append("firstName", firstNameInputRef.current.value);
    URLDataSend.append("lastName", lastNameInputRef.current.value);
    URLDataSend.append("age", ageInputRef.current.value);
    URLDataSend.append("email", emailInputRef.current.value);
    URLDataSend.append("password", passwordInputRef.current.value);
    URLDataSend.append("mobile", mobileInputRef.current.value);
    URLDataSend.append("profilePic", profilePicInputRef.current.value);

    let myHeaders = new Headers();
    myHeaders.append("content-type", "application/x-www-form-urlencoded");

    let reqOptions = {
      method: "POST",
      headers: myHeaders,
      body: URLDataSend,
    };
    let JSONData = await fetch("http://localhost:1001/signup", reqOptions);
    let JSOData = await JSONData.json();
    alert(JSOData.msg);
  };

  let signUpFormDataFD = async () => {
    let formDataSend = new FormData();
    formDataSend.append("firstName", firstNameInputRef.current.value);

    formDataSend.append("lastName", lastNameInputRef.current.value);
    formDataSend.append("age", ageInputRef.current.value);
    formDataSend.append("email", emailInputRef.current.value);
    formDataSend.append("password", passwordInputRef.current.value);
    formDataSend.append("mobile", mobileInputRef.current.value);

    for (let i = 0; i < profilePicInputRef.current.files.length; i++) {
      formDataSend.append("profilePic", profilePicInputRef.current.files[i]);
    }

    let reqOptions = {
      method: "POST",

      body: formDataSend,
    };
    let JSONData = await fetch("http://localhost:1001/signup", reqOptions);
    let JSOData = await JSONData.json();
    alert(JSOData.msg);
  };
  return (
    <div className="App">
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
          <input ref={ageInputRef}></input>
        </div>
        <div>
          <label>Email</label>
          <input ref={emailInputRef}></input>
        </div>
        <div>
          <label>Password</label>
          <input ref={passwordInputRef}></input>
        </div>
        <div>
          <label>Mobile</label>
          <input ref={mobileInputRef}></input>
        </div>
        <div>
          <label>ProfilePic</label>
          <input
            type="file"
            
            ref={profilePicInputRef}
            onChange={(e) => {
              let selectedImage = URL.createObjectURL(e.target.files[0]);
              setProfilePicPath(selectedImage);
            }}
          ></input>
        </div>
        <div>
          <img src={profilePicPath} className="profilePic"></img>
        </div>
        <div>
          <button
            type="button"
            onClick={() => {
              signUpDataSend();
            }}
          >
            SignUp(JSON)
          </button>
          <button
            type="button"
            onClick={() => {
              signUpURLENCCODED();
            }}
          >
            SignUp(URLENCODED)
          </button>
          <button
            type="button"
            onClick={() => {
              signUpFormDataFD();
            }}
          >
            SignUp(FormData)
          </button>
        </div>
        <p>
          
          Already have account click <Link to="/">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;

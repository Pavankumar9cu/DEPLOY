import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

function Login() {
  let emailInputRef = useRef();
  let passwordInputRef = useRef();
  let navigate = useNavigate();
  let dispatch = useDispatch();

  let loginFormDataFD = async () => {
    let formDataSend = new FormData();
    formDataSend.append("email", emailInputRef.current.value);
    formDataSend.append("password", passwordInputRef.current.value);

    let reqOptions = {
      method : "POST",
      body   : formDataSend,
    };
    let JSONData = await fetch("/login", reqOptions);
    let JSOData = await JSONData.json();
    if (JSOData.status == "success") {
      dispatch({ type: "login", data: JSOData.data });
      navigate("/dashboard");
    } else {
      alert(JSOData.msg);
    }

    console.log(JSOData);
  };
  return (
    <div className="App">
      <form>
        <div>
          <label>Email</label>
          <input ref={emailInputRef}></input>
        </div>
        <div>
          <label>Password</label>
          <input ref={passwordInputRef}></input>
        </div>

        <div>
          <button
            type="button"
            onClick={() => {
              loginFormDataFD();
            }}
          >
            Login
          </button>
        </div>
        <p>
          Create Account <Link to="/signup">Click Here</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;

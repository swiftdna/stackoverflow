import React, { useState, useEffect } from "react";
import "../App.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { handleLoginResponse } from "../actions/app-actions";
import { selectIsLoggedIn } from "../selectors/appSelector";
import { Link } from "react-router-dom";
import Logo from "./Images/logo2.png";
import gLogo from "./Images/g.png";
import fLogo from "./Images/fb.png";
import gitLogo from "./Images/git.png";

import styled from "styled-components";
import Header from "./Header";

//Define a Login Component
export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);

  const usernameChangeHandler = (e) => {
    const inputValue = e.target.value;
    setUsername(inputValue);
  };

  const passwordChangeHandler = (e) => {
    const inputValue = e.target.value;
    setPassword(inputValue);
  };

  //submit Login handler to send a request to the node backend
  const submitLogin = () => {
    const data = {
      username,
      password,
    };

    //set the with credentials to true
    // axios.defaults.withCredentials = true;
    //make a post request with the user data

    axios.post("/signin", data).then((response) => {
      alert(response);
      console.log("----------");
      dispatch(handleLoginResponse(response));
    });
  };

  return (
    <>
      <Header />

      <LoginContainer>
        <img
          src={Logo}
          alt=""
          width={80}
          height={80}
          style={{ marginLeft: "650px", marginTop: "70px" }}
        />
        <br />

        <button
          type="submit"
          className="btn btn-lg btn-block bg-light btn-sm border"
          style={{
            height: "45px",
            width: "480px",
            marginLeft: "480px",
            marginTop: "10px",
          }}
        >
          <img src={gLogo} width={15} height={15} />
          <span style={{ marginLeft: "10px" }}>Login in with Google</span>
        </button>

        <button
          type="submit"
          className="btn btn-dark btn-block"
          style={{
            height: "45px",
            width: "480px",
            marginLeft: "480px",
            marginTop: "10px",
          }}
        >
          <img src={gitLogo} width={35} height={20} />
          <span style={{ marginLeft: "10px" }}>Login in with GitHub</span>
        </button>

        <button
          type="submit"
          className="btn bt btn-lg btn-block btn-sm text-light"
          style={{
            backgroundColor: "rgb(56, 84, 153)",
            width: "480px",
            marginLeft: "480px",
            marginTop: "10px",
          }}
        >
          <img src={fLogo} width={15} height={15} />
          <span style={{ marginLeft: "10px" }}>Login in with Facebook</span>
        </button>

        <div className="container loginPage">
          <form className="border px-5 pb-5 m-5 loginPage--form">
            <div style={{ marginTop: "30px" }} className="loginPage--form--img">
              <h3 className="center mt-2">Login</h3>
            </div>

            <div className="form-outline mb-4">
              <label className="form-label" for="form1Example23">
                Your Email
              </label>
              <div class="input-group flex-nowrap">
                <input
                  type="text"
                  class="form-control"
                  placeholder="@gmail.com"
                  aria-label="gmail"
                  aria-describedby="addon-wrapping"
                  style={{ height: "45px" }}
                  onChange={(event) => {
                    usernameChangeHandler(event);
                  }}
                />
              </div>
            </div>
            <div className="form-outline mb-4">
              <label className="form-label" for="form1Example23">
                Password
              </label>
              <div class="input-group flex-nowrap">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Password"
                  aria-label="Username"
                  aria-describedby="addon-wrapping"
                  style={{ height: "45px" }}
                  onChange={(event) => {
                    passwordChangeHandler(event);
                  }}
                />
              </div>
            </div>
            {/* Input Box Ends */}

            {/* Remember me startes */}
            <div className="d-flex justify-content-between mb-4">
              <div className="form-check mb-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="form1Example3"
                />
                <label className="form-check-label" for="form1Example3">
                  {" "}
                  Remember me{" "}
                </label>
              </div>
              <Link to="/">
                <small> forgot Password?</small>
              </Link>
            </div>
            {/* Remember me Ends */}

            {/* Signup Buttons starts */}
            <button
              type="submit"
              className="btn btn-lg btn-block btn-sm text-light"
              style={{ backgroundColor: "rgb(10, 149, 255)", width: "100%" }}
              onClick={submitLogin}
            >
              Sign up
            </button>
          </form>
        </div>
      </LoginContainer>
    </>
  );
}
export default Login;

const LoginContainer = styled.footer`
  .loginPage {
    font-size: 15px;
    width: 40%;
    margin: auto;
    .loginPage--form {
      background-color: rgba(185, 185, 183, 0.233);
      border-radius: 5px;
      box-shadow: 2px 3px 10px gray;
      align-items: center;

      .loginPage--form--img {
        text-align: center;
        display: block;
        h3 {
          position: relative;
          bottom: 1.5rem;
          font-weight: bold;
        }
      }
    }
  }
`;

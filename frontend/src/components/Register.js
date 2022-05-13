import React, {useState} from 'react';
import {Form, Button} from 'react-bootstrap';
import { register } from '../utils';
import { setAlert } from '../actions/app-actions';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import Logo from "./Images/logo2.png";
import gLogo from "./Images/g.png";
import styled from "styled-components";
import fLogo from "./Images/fb.png";
import gitLogo from "./Images/git.png";
import axios from "axios";
import { Row, Col } from 'react-bootstrap';

export default function Register() {

const dispatch = useDispatch();
const [username, setUserName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const submitSignup = (e) => {
		e.preventDefault();
    const data = {
		username,
	  email,
      password,
    };

    axios.post("/api/signup", data).then((response) => 
	{
	    alert('user is successfully created, please login !!! ');
    })
	.catch((error) => {
		alert(error.response.data.message);
	  });

  };

	const info = [
		{
		  icon: (
			<i
			  class="fas fa-question-circle text-primary mr-2"
			  style={{ fontSize: "20px", color: "rgb(10, 149, 255)" }}
			></i>
		  ),
		  text: "Get unstuck — ask a question",
		},
		{
		  icon: (
			<i
			  class="fas fa-sort text-primary mr-2"
			  style={{ fontSize: "25px", color: "rgb(10, 149, 255)" }}
			></i>
		  ),
		  text: "Unlock new privileges like voting and commenting",
		},
		{
		  icon: (
			<i
			  class="fas fa-tags text-primary mr-2"
			  style={{ fontSize: "20px", color: "rgb(10, 149, 255)" }}
			></i>
		  ),
		  text: "Save your favorite tags, filters, and jobs",
		},
		{
		  icon: (
			<i
			  class="fas fa-trophy text-primary mr-2"
			  style={{ fontSize: "20px", color: "rgb(10, 149, 255)" }}
			></i>
		  ),
		  text: "Earn reputation and badges",
		},
	  ];
	  
		return (
		  <RegisterContainer>

			<div classNameName="loginPage" style={{marginTop:"100px"}}>
			  <section className="vh-100">
				<div className="container py-5">
				  <div className="row d-flex align-items-center justify-content-center h-100">
					{/* left Side Stack Overflow community part started*/}
					<div className="col-md-8 col-lg-7 col-xl-6 ml-3" style={{marginTop:"-100px", fontSize: "15px"}}>
					  <img src={Logo} alt="" width="150px" />
					  <h3 className="font-weight-normal my-3">
						Join the Stack Overflow community
					  </h3>
	  
					  {info && info.map((text) => {
						return (
						  <div className="my-3">
							{text.icon}
							{text.text}
						  </div>
						);
					  })}
					  <div className="mt-4">
						<small>
						  Collaborate and share knowledge with a private group for
						  FREE. <br />
						  <Link to="/">
							Get Stack Overflow for Teams free for up to 50 users.
						  </Link>
						</small>
					  </div>
					</div>
					{/* left Side Stack Overflow community part Ends*/}
	  
					{/* Signup form started */}
					<div className="col-md-7 col-lg-5 col-xl-5 bt-light border p-5 pb-0" style={{marginTop:"-30px", 
					     fontSize: "15px", height: "420px", width: "500px" }}>
					  <h2
						className="text-center"
						style={{
						  color: "rgb(242, 116, 13)"
						}}
					  >
						Sign up
					  </h2>
					  <form>
						<div className="form-outline mb-4">
						  <label className="form-label" for="form1Example13">
							User Name
						  </label>
						  <div class="input-group flex-nowrap">

							<input
							  type="text"
							  class="form-control"
							  placeholder="Username"
							  aria-label="Username"
							  aria-describedby="addon-wrapping"
							  style={{height:"45px"}}
							  onChange={(event) => {
								setUserName(event.target.value);
							  }}
							/>
						  </div>
						</div>
						<div className="form-outline mb-4">
						  <label className="form-label" for="form1Example23">
							Email
						  </label>
						  <div class="input-group flex-nowrap">
		
							<input
							  type="text"
							  class="form-control"
							  placeholder="hello@gmail.com"
							  aria-label="gmail"
							  aria-describedby="addon-wrapping"
							  style={{height:"45px"}}
							  onChange={(event) => {
								setEmail(event.target.value);
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
							  type="password"
							  class="form-control"
							  placeholder="Password"
							  aria-label="Username"
							  aria-describedby="addon-wrapping"
							  style={{height:"45px"}}
							  onChange={(event) => {
								setPassword(event.target.value);
							  }}
							/>
						  </div>
						</div>
	  
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
	  
						<button
						  type="submit"
						  className="btn btn-block text-light"
						  style={{ backgroundColor: "rgb(10, 149, 255)" ,								  width:"100%",
						  width:"100%",
						}}
						onClick={(e) => {submitSignup(e)}}
						>
						  Sign up
						</button>
						
					  </form>
					</div>
					{/* Signup form Ends */}
				  </div>
				</div>
			  </section>
			</div>
		  </RegisterContainer>
		);
}

const RegisterContainer = styled.footer`
.loginPage{
    font-size: 15px;
}
`;
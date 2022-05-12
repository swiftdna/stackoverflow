import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Output from 'editorjs-react-renderer';
import UserCard from './UserCard';
import { useSelector, useDispatch } from 'react-redux';
import axios from "axios";

function AdminReview()
{
  const navigate = useNavigate();
   const suntags =["java", "c++", "c", "react"];

    return(
        <AdminReviewContainer>
        <div> 

    <div className="all-questions">
      <div className="all-questions-container">
        <div className="all-questions-left">

           <div className="all-option" style={{borderStyle:"solid ", 
                                        color:"white"}}>              
              <span style={{}}> 
                   <button style={{ color:"white", padding:"5px", borderRadius:"10px",
                               backgroundColor: "#009933" }}> accept</button> 
              </span><br/>
              <span> <button style={{ color:"white", padding:"5px", borderRadius:"10px",
                               backgroundColor: "red" }}>decline</button> </span>
            </div>

        </div>

        <div className="question-answer">

         <a href 
                 style={{fontWeight:"bold"}}className="question-hyperlink">
                     CSS animations default to slow fade in-out, is there a way to change that?
                 </a>

          <div
            style={{
              maxWidth: "90%",
            }}
          >
            
            <div>
            New to using CSS animations. Created an animation with 8 pictures for a total
             animation-duration 100sec. 
            </div>
          </div>
          <div
            style={{
              display: "flex",
            }}
          >

          {suntags.map((_tag) => (
           <span  className="question-tags"> {_tag} </span>
            ))}

          </div>
          <div className="author">

        
          </div>
        </div>
      </div>
    </div>

        </div>
        
        <div className='horizontalLine'>
          <hr/>
        </div>

        </AdminReviewContainer>
    ); 
}

export default AdminReview;

const AdminReviewContainer = styled.footer`

.horizontalLine
{
    margin-left: 250px;
    margin-right: 400px;
}

a:hover
{
   font-weight: bold;
}

.all-questions {
    display: flex;
    /* flex-direction: column; */
    width: 30%;
    padding: 20px 0px;
    width: 100%;
    font-size: 15px;
    margin-top: 100px;
    margin-left: 300px;
  }
  
  .all-questions-container {
    display: flex;
    flex-direction: column;
    flex-direction: row;
    /* align-items: center; */
    justify-content: space-between;
    width: 100%;
  }
  
  .all-questions-left {
    display: flex;
    margin-right: 30px;
  }
  
  .all-options {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: rgba(0, 0, 0, 0.7);
    font-size: small;
  }
  
  .all-option {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 10px;
  }
  
  .all-option > p {
    font-size: large;
  }
  
  .question-answer {
    display: flex;
    flex-direction: column;
    font-size: 14px;
    width: 100%;
  }
  
  .question-answer > a {
    color: #0151f0d8;
    margin-bottom: 10px;
  }
  .question-answer > a:hover {
    color: #1649b1d8;
    font-size: 1.1rem;
    margin-bottom: 10px;
  }
  
  .question-answer > p {
    font-size: 0.9rem;
    color: rgba(0, 0, 0, 0.7);
    margin-bottom: 10px;
  }
  
  .author {
    display: flex;
    flex-direction: column;
    margin-left: 600px;
    margin-top: -30px;
    font-size: 10px;
  }
  
  .author > small {
    color: rgba(0, 0, 0, 0.5);
    margin-bottom: 5px;
  }
  
  .auth-details {
    display: flex;
    align-items: center;
  }
  
  .auth-details > p {
    margin-left: 5px;
    font-size: small;
    color: #0151f0d8;
  }
  
  .comments {
    margin: 10px 0;
    width: 90%;
    margin-left: auto;
  }
  
  .comment {
    display: flex;
    flex-direction: column;
    font-size: 0.9rem;
    padding: 10px 0px;
    border-bottom: 1px solid #eee;
    border-top: 1px solid #eee;
  }
  
  .comment > p {
    margin: 10px 0;
  }
  
  .comment > p > span {
    padding: 3px;
    background-color: #0151f028;
    color: #0151f0d8;
    border-radius: 2px;
  }
  
  .comments > p {
    margin-left: -30px;
    margin-top: 20px;
    font-size: small;
    cursor: pointer;
    color: rgba(0, 0, 0, 0.4);
  }
  
  .comments > p:hover {
    color: #0151f0a2;
  }

  .question-tags
  {
      margin : 10px 5px;
      padding: 5px 10px;
      background-color: var(--powder-100);
      border-radius: blue;
      cursor: pointer;
  }

  .question-tags:hover
  {
    color: blue;
    border-radius:3px;
  }

`;
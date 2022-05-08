import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import gLogo from "./Images/g.png";


function AllQuestions()
{
    return(
        <AllQuestionContainer>
        <div> 

    <div className="all-questions">
      <div className="all-questions-container">
        <div className="all-questions-left">
          <div className="all-options">
            <div className="all-option">
              <p>0</p>
              <span>votes</span>
            </div>
            <div className="all-option">
              <p>20</p>
              <span>answers</span>
            </div>
            <div className="all-option">
              <small>2 views</small>
            </div>
          </div>
        </div>

        <div className="question-answer">
          <Link to={""}>There are many variations of passages of Lorem Ipsum available, 
                        but the majority have suffered alteration in some form</Link>

          <div
            style={{
              maxWidth: "90%",
            }}
          >
            <div>hi, this is sunny hith reddy.. im from nizamabad, telangana, india...im studing masters in sjsu</div>
          </div>
          <div
            style={{
              display: "flex",
            }}
          >
           <span className="question-tags"> react </span>
           <span className="question-tags"> java </span>
           <span className="question-tags"> python </span>

          </div>
          <div className="author">
            <small>asked 4 years ago</small>
            <div className="auth-details">
             <img src={gLogo} width={20} height={20}/>
              <p>
              sunny
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

        </div>
        
        <div className='horizontalLine'>
          <hr/>
        </div>

        </AllQuestionContainer>
    ); 
}

export default AllQuestions;

const AllQuestionContainer = styled.footer`

.horizontalLine
{
    margin-left: 250px;
    margin-right: 400px;
}

.all-questions {
    display: flex;
    /* flex-direction: column; */
    width: 30%;
    padding: 20px 0px;
    width: 100%;
    margin-left : 250px;
    font-size: 15px;
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
  }

`;
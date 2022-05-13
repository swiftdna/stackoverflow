import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Output from 'editorjs-react-renderer';
import UserCard from './UserCard';
import { useSelector, useDispatch } from 'react-redux';
import axios from "axios";

function AllQuestions({data, isAuthorRequired, questionId})
{
  const navigate = useNavigate();
  const [questionAuthorDetails, SetQuestionAuthorDetails] = useState("");

  useEffect(() => {
    axios.get(`/api/questions/${questionId}`)
    .then(response => {
      SetQuestionAuthorDetails(response.data.data)
    })
    .catch(err => {
        console.log(err.message);
    });
}, []);

  const openQuestion = (id) => {
    navigate(`/questions/${id}`);
  }

  let bestAnswer = false;

  {data && data.answers && data.answers.map((answer) => 
    {
       if(answer.isbestanswer)
       {
           bestAnswer = true;
       }
    }
   )}

    return(
        <AllQuestionContainer>
        <div> 

    <div className="all-questions">
      <div className="all-questions-container">
        <div className="all-questions-left">
          <div className="all-options">
            <div className="all-option">
              <p>{data.score}</p>
              <span>votes</span>
            </div>
            
            
            <div className="all-option" style={{borderStyle:"solid", 
                 color:"white",
                 backgroundColor: (data.status == "pending") ? "red" : "green",
                 padding: "8px", borderRadius:"10px"}}>
                  
                { (data.status=="pending" )?
                  <div>
                     <span>pending</span>
                  </div> : ""}
                  { 

           ( bestAnswer) ? <div>
                     <span>accepted</span>
                  </div> : ""
               }
                 

            </div>
                

            <div className="all-option" style={{borderStyle:"solid", 
                                        color:"black",
                                        padding: "4px"}}>
              <p>{data.answers.length}</p>
              
              <span>answers</span>
            </div>
            
            <div className="all-option">
              <small>{data.views} views</small>
            </div>
          </div>
        </div>

        <div className="question-answer">

         <a href onClick={() => openQuestion(questionId)} title={data.title} 
                 style={{fontWeight:"bold"}}className="question-hyperlink">{data.title}</a>
          <div
            style={{
              display: "flex",
            }}
          >

          {data.tags && data.tags.map((_tag) => (
           <span onClick={() => openQuestion(questionId)} className="question-tags"> {_tag} </span>
            ))}

          </div>
          <div className="author">

          {isAuthorRequired && <UserCard owner={true} data={{...questionAuthorDetails.author, 
                                            modified: questionAuthorDetails.modifiedFullText}} />}
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
    margin-left: 0px;
    margin-right: 400px;
    width: 750px;
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
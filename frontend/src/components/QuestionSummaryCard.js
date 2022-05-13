
import React, { useEffect, useState } from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Output from 'editorjs-react-renderer';
import UserCard from './UserCard';
import { formatShortDate } from '../utils';
import axios from 'axios';

export default function QuestionSummaryCard({data, isUser, fn}) {
    const navigate = useNavigate();

    const openQuestion = (id) => {
        navigate(`/questions/${id}`);
    }

    const openTagQuestions = (tag) => {
        navigate(`/questionTag/${tag}`);
      }

    const AcceptQuestion = (questionid) => 
    {
            axios.put(`/api/approvequestion/${questionid}`).then((response) => 
            {

            })
            .catch((error) => {
              alert(error.response.data.message);
            });
          // Refresh
          if (fn && fn.getReviewPendingItems) {
            fn.getReviewPendingItems();
          }
      }

    const RejectQuestion = (questionid) => {
        axios.get(`/api/rejectQuestion/${questionid}`).then((response) => {

        })
        .catch((error) => {
          alert(error.response.data.message);
          });
        // Refresh
        if (fn && fn.getReviewPendingItems) {
            fn.getReviewPendingItems();
        }
    }

    const isAnswerAcceptedForQuestion = () => {
        if (data.bestanswer) {
            return "status answered-accepted";
        } else {
            return "status";
        }
    }

    return (
		<Row>
            <Col xs={1}>
             {  
                isUser ?

                
                    <div className="statscontainer">
                    <div className="stats">
                        <div className="vote">
                            <div className="votes">
                                {data.score && <span className="vote-count-post"><strong>{data.score}</strong></span>}
                                <div className="viewcount">votes</div>
                            </div>
                        </div>
                        <div className={isAnswerAcceptedForQuestion()}>
                            {data.answers && <><strong>{data.answers.length}</strong>answers</>}
                        </div>
                        <p className="views">{data.views} views</p>
                    </div>
                    </div>
                 :


             <div className="all-option" style={{borderStyle:"solid ",
                              fontSize:"13px", 
                              color:"white"}}>     

                  <span style={{}}> 
                     <button onClick={() => AcceptQuestion(data._id)}
                     style={{ color:'white', padding: '5px 12px', borderRadius: '5px', border: 'none',
                     backgroundColor: "#009933" }}>accept</button> 
                  </span><br/><br/>

                  <span> 
                      <button onClick={() => RejectQuestion(data._id)}
                      style={{ color:'white', padding: '5px 12px', borderRadius: '5px', border: 'none',
                      backgroundColor: '#D50000' }}>decline</button> 
                  </span>
              </div>
            } 
            </Col>
            <Col xs={11}>
                <div className="summary">
                    <div className="result-link">
                        <h3>
                            <a href onClick={() => openQuestion(data._id)} title={data.title} className="question-hyperlink">{data.title}</a>
                        </h3>
                    </div>
                    <div className="excerpt">
                        {data.isMultiMedia ? <Output data={ data.text } /> : <p>{data.text}</p>}
                    </div>
                    <div className="tags d-flex gs4 fw-wrap mt2 t-java t-string t-random">

              {data.tags.map((_tag) => (                       
                       <a href onClick={() => openTagQuestions(_tag)} className="post-tag flex--item" title="" rel="tag">{_tag}</a> 
            ))}
                    </div>
                    <div className="started float-right">
                        {data.author ? <UserCard source="list" data={{ ...data.author, modified: formatShortDate(data.modified) }} owner={true} /> : ''}
                    </div>
                </div>
            </Col>
            <hr style={{ backgroundColor: 'rgb(188 188 188)', height: '1px'}} />
        </Row>
	);
}
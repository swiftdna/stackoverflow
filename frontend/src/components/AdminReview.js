import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Output from 'editorjs-react-renderer';
import { useSelector, useDispatch } from 'react-redux';
import axios from "axios";
import Sidebar from './Sidebar';
import { Row, Button, Col } from 'react-bootstrap';
import QuestionSummaryCard from './QuestionSummaryCard';

function AdminReview() {
  const navigate = useNavigate();
  const [questionsResponse, SetQuestionsResponse] = useState([]);

  const getReviewPendingItems = () => {
    axios.get(`/api/getPendingQuestion`)
     .then(response => 
       {
            SetQuestionsResponse(response.data.data);
            console.log(response.data.data)
       })
     .catch(err => {
     });
  }

   useEffect(() => {
     getReviewPendingItems();
   }, []);

    return(    
          

      <div className="container" style={{marginTop: '80px'}}>
      <Row>
          <Sidebar />
          <Col xs={10} style={{paddingLeft: '20px'}}>
          {questionsResponse && questionsResponse.map(userItem => <QuestionSummaryCard data={userItem} 
                                                                   isUser={false} fn={{getReviewPendingItems}} />)}
          </Col>
      </Row>
  </div>
    ); 
}

export default AdminReview;

import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import Output from 'editorjs-react-renderer';
import UserCard from './UserCard';
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';
import QuestionSummaryCard from './QuestionSummaryCard';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Row, Button, Col } from 'react-bootstrap';
import Sidebar from './Sidebar';
import { searchQuestions } from '../utils';

function QuestionTag()
{
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const urlParams = useParams();
  const { tag } = urlParams;
  const params = {};
  params.key = 'tag';
  params.value = tag;

  const [questionDetails, SetQuestionDetails] = useState([]);
  
  useEffect(() => {
    axios.get(`/api/searchQuestion`, { params })
.then(response => {
    SetQuestionDetails( response.data.data )
})
.catch(err => {
    console.log(err.message);
})}, []);


const openQuestion = (id) => {
navigate(`/questions/${id}`);
}

console.log("sunny hith reddy")
console.log(questionDetails);

return(
  <>
    <div className="container" style={{marginTop: '60px'}}>
        <Row>
            <Sidebar />
            <Col xs={10} style={{paddingLeft: '20px'}}>
              <Row>
                  <Col xs={9}>
                      <h1>Questions tagged {"["}{tag} {"]"}</h1>
                  </Col>
                  <Col xs={3}>
                      <button className="btn btn-register" style={{float: 'right'}} onClick={() => navigate('/questions/ask')}>Ask Question</button>
                  </Col>
              </Row>

              <div className="d-flex s-btn-group js-filter-btn" style={{marginTop: '10px'}}>
                <a className="js-sort-preference-change youarehere is-selected flex--item s-btn s-btn__muted s-btn__outlined" href="/search?tab=relevance&amp;q=" data-nav-xhref="" title="Search results with best match to search terms" data-value="relevance" data-shortcut="">
                    Hot</a>
                <a className="js-sort-preference-change flex--item s-btn s-btn__muted s-btn__outlined" href="/search?tab=newest&amp;q=xyz" data-nav-xhref="" title="Newest search results" data-value="newest" data-shortcut="">
                    Score</a>
                <a className="js-sort-preference-change flex--item s-btn s-btn__muted s-btn__outlined" href="/search?tab=newest&amp;q=xyz" data-nav-xhref="" title="Newest search results" data-value="newest" data-shortcut="">
                    Unanswered</a>
              </div>
              <hr style={{marginTop: '70px'}} />
              {questionDetails && questionDetails.map(questionItem => 
                  <QuestionSummaryCard data={questionItem} />)}
             
            </Col>
        </Row>
        </div>
</>
);

}

export default QuestionTag;
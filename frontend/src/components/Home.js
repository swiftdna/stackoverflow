import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Row, Button, Col } from 'react-bootstrap';
import { selectIsLoggedIn } from '../selectors/appSelector';
import AllQuestions from './AllQuestions';
import styled from 'styled-components';
import { Link } from "react-router-dom";
import RightSidebar from "./RightSideBar";
import { selectAllQuestions } from '../selectors/appSelector';
import { handleAllQuestionsResponse } from "../actions/app-actions";

//create the Navbar Component
function Home()
{

  const [questionsResponse, SetQuestionsResponse] = useState("");
  const dispatch = useDispatch();
  const params={};
  params.tab = 'views';

  useEffect(() => {
    axios.get("/api/questions", { params }).then((response) => 
    {
      SetQuestionsResponse(response.data.data);
      console.log(response.data.data)
    })
    .catch((error) => {
      alert(error.response.data.message);
      })
    ;
  }, []);
  
  
  console.log( questionsResponse );
    const isAuthenticated = useSelector(selectIsLoggedIn);
    const navigate = useNavigate();

    return(
      <>
        <div className="container" style={{marginTop: '50px'}}>
            <Row>
                <Sidebar />
                <Col xs={10} style={{paddingLeft: '20px'}}>
                {/*
                  <Row>
                      <Col xs={9}>
                          <h1>Top Questions</h1>
                      </Col>
                      <Col xs={3}>
                          <button className="btn btn-register" style={{float: 'right'}} onClick={() => navigate('/questions/ask')}>Ask Question</button>
                      </Col>
                  </Row>
                
                <div className="d-flex s-btn-group js-filter-btn" style={{marginTop: '10px'}}>
                    <a className="js-sort-preference-change youarehere is-selected flex--item s-btn s-btn__muted s-btn__outlined" href="/search?tab=relevance&amp;q=xyz" data-nav-xhref="" title="Search results with best match to search terms" data-value="relevance" data-shortcut="">
                        Relevance</a>
                    <a className="js-sort-preference-change flex--item s-btn s-btn__muted s-btn__outlined" href="/search?tab=newest&amp;q=xyz" data-nav-xhref="" title="Newest search results" data-value="newest" data-shortcut="">
                        Newest</a>
                </div>
                {
                    questions && questions.map(q => <p onClick={() => navigate(`/questions/${q.id}`)}>check {q.id}</p>)
                }
                
                <p onClick={() => navigate('/messages')}>messages</p>*/}
                <HomeContainer>
                  <Row>
                      <Col xs={9}>
                          <h1>Top Questions</h1>
                      </Col>
                      <Col xs={3}>
                          <button className="btn btn-register" style={{float: 'right'}} onClick={() => navigate('/questions/ask')}>Ask Question</button>
                      </Col>
                  </Row>

                  {/* <div className="filterBtnDiv">
                    <button className="filterBtn">Hot</button>
                    <button className="filterBtn">Score</button>
                    <button className="filterBtn">Unanswered</button>
                  </div> */ }
                  <div className="d-flex s-btn-group js-filter-btn" style={{marginTop: '10px'}}>
                    <a className="js-sort-preference-change youarehere is-selected flex--item s-btn s-btn__muted s-btn__outlined" href="/search?tab=relevance&amp;q=" data-nav-xhref="" title="Search results with best match to search terms" data-value="relevance" data-shortcut="">
                        Hot</a>
                    <a className="js-sort-preference-change flex--item s-btn s-btn__muted s-btn__outlined" href="/search?tab=newest&amp;q=xyz" data-nav-xhref="" title="Newest search results" data-value="newest" data-shortcut="">
                        Score</a>
                    <a className="js-sort-preference-change flex--item s-btn s-btn__muted s-btn__outlined" href="/search?tab=newest&amp;q=xyz" data-nav-xhref="" title="Newest search results" data-value="newest" data-shortcut="">
                        Unanswered</a>
                  </div>
                  <hr style={{marginTop: '70px'}} />
                  
                  <div>

                  {questionsResponse && questionsResponse.map(questionItem => <AllQuestions data={questionItem} />)}
                  
                  </div>

                  {/* <div>
                    <RightSidebar />
                  </div> */}
                </HomeContainer>
                </Col>
            </Row>
            </div>
    </>
  );
}

export default Home;

const HomeContainer = styled.footer`
  .home-top {
  }

  .askQuestnDiv {
    margin-left: 890px;
    margin-top: -35px;
  }

  .askBtn,
  .filterBtn {
    color: white;
    background-color: var(--blue-500);
    border-radius: 3px;
    outline: none;
    font-family: inherit;
    font-size: 13px;
    font-weight: 400;
    line-height: 1.15;
    text-decoration: none;
    cursor: pointer;
    transition: var(--fade);
    border: 1px solid transparent;
    box-shadow: rgb(255 255 255 / 40%) 0px 1px 0px 0px inset;
    padding: 0.8em;
  }

  .home-qst-count {
    margin-top: 40px;
  }

  .filterBtnDiv {
    margin-left: 790px;
    margin-top: -45px;
  }

  .filterBtn {
    margin-left: 2px;
    background-color: var(--blue-500);
  }

  .horizontalLine {
    margin-left: 250px;
    margin-right: 400px;
  }
`;

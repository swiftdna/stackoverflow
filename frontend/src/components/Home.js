import React, { useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Row, Button, Col } from 'react-bootstrap';
import { selectIsLoggedIn } from '../selectors/appSelector';

//create the Navbar Component
function Home() {
    const isAuthenticated = useSelector(selectIsLoggedIn);
    const navigate = useNavigate();
    const questions = useSelector(state => state.questions.data);

    return(
        <div className="container" style={{marginTop: '80px'}}>
            <Row>
                <Sidebar />
                <Col xs={10} style={{paddingLeft: '20px'}}>
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
                
                <p onClick={() => navigate('/messages')}>messages</p>
                </Col>
            </Row>
      
<HomeContainer>
        <div className="home-top">
          <h1>All Questions</h1>
        </div>

        <div className="askQuestnDiv">
          <Link to="/questions/ask">
            <button className="askBtn"> Ask Question </button>
          </Link>
        </div>

        <div className="home-qst-count">
          <h2>Total Questions</h2>
        </div>

        <div className="filterBtnDiv">
          <button className="filterBtn">Hot</button>
          <button className="filterBtn">Score</button>
          <button className="filterBtn">Unanswered</button>
        </div>

        <div className="horizontalLine">
          <hr />
        </div>

        <div>
          <AllQuestions />
          <AllQuestions />
          <AllQuestions />
          <AllQuestions />
          <AllQuestions />
          <AllQuestions />
        </div>

        <div>
          <RightSidebar />
        </div>
      </HomeContainer>
    </>
  );
}

export default Home;

const HomeContainer = styled.footer`
  .home-top {
    margin-left: 270px;
    margin-top: -140px;
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
    margin-left: 270px;
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

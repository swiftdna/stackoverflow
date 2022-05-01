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

        </div>
    )
}

export default Home;

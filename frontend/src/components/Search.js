import React, { useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import QuestionSummaryCard from './QuestionSummaryCard';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Row, Button, Col } from 'react-bootstrap';
import { selectIsLoggedIn } from '../selectors/appSelector';

//create the Navbar Component
function Search() {
    const isAuthenticated = useSelector(selectIsLoggedIn);
    const navigate = useNavigate();
    const params = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const searchKeyword = searchParams.get('q');
    return(
        <div className="container" style={{marginTop: '80px'}}>
            <Row>
                <Sidebar />
                <Col xs={10} style={{paddingLeft: '20px'}}>
                <Row>
                    <Col xs={9}>
                        <h1>Search results for {searchKeyword}</h1>
                    </Col>
                    <Col xs={3}>
                        <button className="btn btn-register" style={{float: 'right'}} onClick={() => navigate('/questions/ask')}>Ask Question</button>
                    </Col>
                </Row>
                <Row style={{marginTop: '20px'}}>
                    <h4>13,531 results</h4>
                    <hr />
                    {Array(15).fill().map(ar => <QuestionSummaryCard />)}
                </Row>
                </Col>
            </Row>
        </div>
    )
}

export default Search;
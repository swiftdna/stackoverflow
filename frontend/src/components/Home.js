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
                    <p onClick={() => navigate('/questions/315135')}>click here</p>
                </Row>
                </Col>
            </Row>
        </div>
    )
}

export default Home;
import React, { useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { Button, Row, Col } from 'react-bootstrap';
import { selectIsLoggedIn } from '../selectors/appSelector';
// import { getQuestionDetails, getAnswers } from '../utils';

//create the Navbar Component
function Messages() {
    const urlParams = useParams();
    const isAuthenticated = useSelector(selectIsLoggedIn);
    // const { questionID } = urlParams;
    // const dispatch = useDispatch();
    // const qdetails = useSelector(state => state.questiondetails.data);
    // const answers = useSelector(state => state.questiondetails.answers);

    return(
        <div className="container" style={{marginTop: '80px'}}>
            <Row>
                <h2>Messages</h2>
                <Col xs={3} className="messages_panel">
                    <ul className="messages_list" style={{marginLeft: 0, paddingLeft: 0}}>
                        {
                            Array(10).fill().map((arr, i) => 
                                <li className={(i===0) ? 'active' : ''}>
                                    <p className="heading">User {i+1}</p>
                                    <p>Last message comes here</p>
                                </li>
                            )
                        }
                    </ul>
                </Col>
                <Col xs={9}>
                    <div className="messages_content_panel">
                        {
                            Array(10).fill().map((arr, i) => 
                                <div className={i % 2 === 0 ? 'sender' : 'receiver'}>
                                    <p className="u_name">User {i+1}</p>
                                    <p>Last message comes here</p>
                                </div>
                            )
                        }
                    </div>
                    <div className="messages_send">
                        <input type="text"/>
                    </div>
                </Col>
            </Row>
            
        </div>
    )
}

export default Messages;
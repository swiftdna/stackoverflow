import React, { useEffect } from 'react';
import axios from 'axios';
import ContentCard from './ContentCard';
import Sidebar from './Sidebar';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { Button, Row, Col } from 'react-bootstrap';
import { selectIsLoggedIn } from '../selectors/appSelector';
import { getQuestionDetails, getAnswers } from '../utils';

//create the Navbar Component
function Question() {
    const urlParams = useParams();
    const isAuthenticated = useSelector(selectIsLoggedIn);
    const { questionID } = urlParams;
    const dispatch = useDispatch();
    const qdetails = useSelector(state => state.questiondetails.data);
    const answers = useSelector(state => state.questiondetails.answers);

    useEffect(() => {
        getQuestionDetails(dispatch, questionID);
        getAnswers(dispatch, questionID);
    }, []);

    return(
        <div className="container" style={{marginTop: '80px'}}>
            <Row>
                <Sidebar />
                <Col xs={10} style={{paddingLeft: '20px'}}>
                    <ContentCard data={qdetails} type="question" />
                    {
                        answers && <div style={{marginTop: '10px'}}>
                        <h3>{answers.length} Answers</h3>
                        {
                            answers.map(answer => <ContentCard data={answer} />)
                        }
                        </div>
                    }
                </Col>
            </Row>
            
        </div>
    )
}

export default Question;
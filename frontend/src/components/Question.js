import React, { useEffect } from 'react';
import axios from 'axios';
import ContentCard from './ContentCard';
import Sidebar from './Sidebar';
import Loader from './Loader';
import AddAnswer from './AddAnswer';
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
    const qloading = useSelector(state => state.questiondetails.loading);
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
                    {
                        qloading ? <Loader text="Loading question details.." /> : <>
                            <ContentCard data={qdetails} type="question" />
                            {
                                answers && <div style={{marginLeft: '14px', marginTop: '10px'}}>
                                <h3>{answers.length} Answers</h3>
                                {
                                    answers.map(answer => <ContentCard data={answer} />)
                                }
                                </div>
                            }
                            <AddAnswer data={questionID} />
                            </>
                    }
                    
                </Col>
            </Row>
            
        </div>
    )
}

export default Question;
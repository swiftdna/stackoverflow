import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ContentCard from './ContentCard';
import Sidebar from './Sidebar';
import Loader from './Loader';
import AddAnswer from './AddAnswer';
// import AskQuestion from './AskQuestion';
import Test from './Test';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { Button, Row, Col, Modal } from 'react-bootstrap';
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
    const [show, setShow] = useState(false);
    const [editData, setEditData] = useState({});
    const [extras, setExtras] = useState({});

    useEffect(() => {
        setEditData({});
        setShow(false);
        getQuestionDetails(dispatch, questionID);
        // getAnswers(dispatch, questionID);
    }, []);

    const handleClose = () => {
        setEditData({});
        setShow(false);
    }

    const editQuestion = (disp, params) => {
        const qForm = {
            time: 1556098174501,
            blocks: [],
            version: "2.12.4"
        };
        if (!params.isMultiMedia) {
                // Convert it to multimedia
            qForm.blocks.push({
                type: "paragraph",
                data: {
                    text: params.text,
                    level: 2
                }
            });
            setEditData(qForm);
        } else {
            setEditData(params.text);
        }
        setExtras(params);
        setShow(true);
    }

    return(
        <div className="container" style={{marginTop: '80px'}}>
            <Row>
                <Sidebar />
                <Col xs={10} style={{paddingLeft: '20px'}}>
                    {
                        qloading ? <Loader text="Loading question details.." /> : <>
                            <ContentCard questionID={qdetails._id} data={qdetails} type="question" fn={{editQuestion}} />
                            {
                                answers && <div style={{marginLeft: '14px', marginTop: '20px'}}>
                                <h3>{answers.length} Answers</h3>
                                {
                                    answers.map(answer => <ContentCard type="answer" questionID={qdetails._id} qQuthor={qdetails.author} data={answer} />)
                                }
                                </div>
                            }
                            <AddAnswer data={questionID} />
                            </>
                    }
                    <Test mode="edit" show={show} data={editData} extras={extras} fn={{handleClose}} />  
                </Col>
            </Row>
            
        </div>
    )
}

export default Question;
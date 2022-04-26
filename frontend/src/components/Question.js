import React, { useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { Button, Row, Col } from 'react-bootstrap';
import { FaCaretUp, FaCaretDown, FaRegBookmark, FaHistory } from 'react-icons/fa';
import { selectIsLoggedIn } from '../selectors/appSelector';
import { getQuestionDetails } from '../utils';

//create the Navbar Component
function Question() {
    const urlParams = useParams();
    const isAuthenticated = useSelector(selectIsLoggedIn);
    const { questionID } = urlParams;
    const dispatch = useDispatch();
    const qdetails = useSelector(state => state.questiondetails.data);

    useEffect(() => {
        getQuestionDetails(dispatch, questionID);
    }, []);

    return(
        <div className="container" style={{marginTop: '80px'}}>
            <Row>
                <Col xs={2}></Col>
                <Col xs={10}>
                    <h1>{qdetails.title}</h1>
                    <p className="q_subheading">
                        <span className="mini-heading">Asked</span> 1 year, 5 months ago <span className="mini-heading">Modified</span> 4 days ago <span className="mini-heading">Viewed</span> 606k times
                    </p>
                    <hr />
                    <Row>
                        <Col xs={1}>
                            <FaCaretUp className="vote_ctrl" />
                            <p className="vote_counter">246</p>
                            <FaCaretDown className="vote_ctrl" />
                            <FaRegBookmark className="bookmark_ctrl" />
                            <p className="bookmark_counter">36</p>
                            <FaHistory className="history_ctrl" />
                        </Col>
                        <Col xs={11}>
                            <p className="q_desc">{qdetails.description}</p>
                            <p className="q_tags">
                                {qdetails.tags && qdetails.tags.map(tag => <span className="q_tag">{tag}</span>)}
                            </p>
                            <Row className="share_author_panel">
                                <Col xs={4}>
                                    <span className="other_ctrls">Share</span>
                                    <span className="other_ctrls">Improve this question</span>
                                    <span className="other_ctrls">Follow</span>
                                </Col>
                                <Col xs={8}>
                                    
                                </Col>
                            </Row>
                            <hr />
                            <p className="q_comments">
                                <ul>
                                {qdetails.comments && qdetails.comments.map(comment => 
                                    <li className="q_comment">
                                        {comment.content} - <span className="q_comment_author">{comment.author}</span> <span className="q_comment_time">{comment.created}</span>
                                        <hr />
                                    </li>
                                )}
                                </ul>
                            </p>
                        </Col>
                    </Row>
                </Col>

            </Row>
            
        </div>
    )
}

export default Question;
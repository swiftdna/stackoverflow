import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { FaUndoAlt, FaRefresh } from 'react-icons/fa';
import { Button, Row, Col } from 'react-bootstrap';
import Loader from './Loader';
import { selectIsLoggedIn, selectUser } from '../selectors/appSelector';
import { getMessageThreads, getMessages, sendMessage } from '../utils';

//create the Navbar Component
function Messages() {
    const urlParams = useParams();
    const isAuthenticated = useSelector(selectIsLoggedIn);
    const userDetails = useSelector(selectUser);
    // const { questionID } = urlParams;
    const dispatch = useDispatch();
    const [currentRecipientID, setCurrentRecipientID] = useState('');
    const [message, setMessage] = useState('');
    const recipients = useSelector(state => state.messages.recipients);
    const messages = useSelector(state => state.messages.data);
    const loading = useSelector(state => state.messages.loading);
    // const answers = useSelector(state => state.questiondetails.answers);

    useEffect(() => {
        getMessageThreads(dispatch);
    }, []);

    const fetchMessages = (id) => {
        console.log('get messages of ', id);
        setCurrentRecipientID(id);
        // Check here before retrieving
        getMessages(dispatch, id);
    }

    const refresh = () => {
        fetchMessages(currentRecipientID);
    }

    const send = () => {
        console.log('currentRecipientID -> ', currentRecipientID);
        console.log('message -> ', message);
        sendMessage(dispatch, {
            recipient: currentRecipientID,
            message
        }, (err, successFlag) => {
            if (successFlag) {
                setMessage('');
                refresh();
            }
        });
    }

    const _handleKeyDown = (e) => {
        if (e.key === 'Enter' && message) {
            send();
        }
    }

    const getSender = () => {
        if (userDetails && userDetails.username) {
            return userDetails.username;
        }
        return 'You';
    }

    const isThreadActive = (id) => {
        return currentRecipientID === id;
    };

    return(
        <div className="container" style={{marginTop: '80px'}}>
            <Row>
                <h2>Messages</h2>
                <Col xs={3} className="messages_panel">
                    <ul className="messages_list" style={{marginLeft: 0, paddingLeft: 0}}>
                        {
                            recipients.map((recipient, i) => 
                                <li onClick={() => fetchMessages(recipient.id)} className={isThreadActive(recipient.id) ? 'active' : ''}>
                                    <p className="heading">{recipient.username}</p>
                                </li>
                            )
                        }
                    </ul>
                </Col>
                <Col xs={9}>
                    {loading ? 
                        <Loader /> :
                        <>
                            {currentRecipientID && <div>
                                <span onClick={() => refresh()} style={{float: 'right', marginRight: '-10px', fontSize: '15px', color: '#0070BA', cursor: 'pointer'}}><FaUndoAlt /> refresh</span>
                            </div>}
                            <div className="messages_content_panel">
                                {
                                    currentRecipientID && messages && messages[currentRecipientID] && messages[currentRecipientID].length ?
                                        messages[currentRecipientID].map((msg, i) => 
                                            <div className={msg.sender ? 'sender' : 'receiver'}>
                                                <p className="u_name">{msg.recipient ? msg.recipient.username : getSender()}</p>
                                                <p>{msg.content}</p>
                                            </div>
                                        ) : 'No conversation found'
                                }
                            </div>
                            {currentRecipientID && <div className="messages_send">
                                <input placeholder="Type a message.." type="text" value={message} onChange={e => setMessage(e.target.value)} onKeyDown={_handleKeyDown} />
                            </div>}
                        </>
                    }
                </Col>
            </Row>
            
        </div>
    )
}

export default Messages;
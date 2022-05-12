import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { Spinner, Table, InputGroup, Button, FormControl, Badge, Modal, Form, Row, Col } from 'react-bootstrap';
import { fetchUsers, sendMessage, getMessageThreads } from '../utils';
import { selectIsLoggedIn, selectUser } from '../selectors/appSelector';
import { setToast } from '../actions/app-actions';
import { Typeahead } from 'react-bootstrap-typeahead';

function NewMessage({data, showFlag, fn}) {
    const dispatch = useDispatch();
    const resetMessageState = {
        recipient: '',
        message: ''
    };
    const userDetails = useSelector(selectUser);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState([]);
    const [messageForm, setMessageForm] = useState(resetMessageState);

    useEffect(() => {
        async function fetchData() {
            const usersData = await fetchUsers();
            setUsers(usersData);
        }
        fetchData();
        setSelectedUser([]);
    }, [])

    const reset = () => {
        setUsers([]);
        setSelectedUser([]);
        setMessageForm(resetMessageState);
    }

    const handleCloseButton = () => {
        if (fn && fn.handleNewMessageClose) {
            fn.handleNewMessageClose();
        }
    }

    const createMessage = () => {
        const messageObj = {
            ...messageForm
        };
        console.log(messageObj);
        sendMessage(dispatch, messageObj, (err, successFlag) => {
            if (successFlag) {
                if (fn && fn.handleNewMessageClose) {
                    setMessageForm(resetMessageState);
                    getMessageThreads(dispatch);
                    fn.handleNewMessageClose();
                }
            }
        });
    }

    const onMessageFormChange = (e) => {
        const fieldName = e.target.getAttribute('id');
        const tempForm = {...messageForm};
        tempForm[fieldName] = e.target.value;
        setMessageForm(tempForm);
    }

    const showValid = () => {
        return users.filter(user => user.id !== userDetails.id);
    }

    return (
        <div className="container">
            <Modal show={showFlag} onHide={handleCloseButton}>
                <Modal.Header closeButton>
                    <Modal.Title>New Message</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="property_details">
                        <Form.Label htmlFor="recipient">Recipient</Form.Label>
                        <Typeahead
                          id="recipient"
                          onChange={selected => {
                            setSelectedUser(selected);
                            messageForm.recipient = selected && selected[0] && selected[0].id;
                          }}
                          labelKey={option => `${option.username ? option.username : 'unknown'} (${option.id})`}
                          options={showValid()}
                          selected={selectedUser}
                        />
                        <Form.Label htmlFor="message">Message</Form.Label>
                        <Form.Control
                            type="text"
                            id="message"
                            aria-describedby="message"
                            value={messageForm.message}
                            onChange={onMessageFormChange}
                          />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleCloseButton()}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => createMessage()}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default NewMessage;
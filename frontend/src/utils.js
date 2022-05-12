import { handleLoginResponse, setToast } from './actions/app-actions';
import { questionDetailsLoading, handleQuestionDetailsResponse, handleAnswerResponse } from './actions/question-details-actions';
import { questionsLoading, handleQuestionsResponse } from './actions/questions-actions';
import { questionSearchLoading, handleQuesSearchResponse } from './actions/questions-search-actions';
import { handleRecipientsResponse, handleMessagesResponse, messagesLoading, recipientsLoading } from './actions/messages-actions';
import moment from 'moment';
// import { useNavigate } from 'react-router-dom';

import axios from 'axios';

export function formatDate(date) {
    return moment(date).format('MMMM Do, YYYY h:mm:ss a');
}
export function formatShortDate(date) {
    return moment(date).format('Do MMM, YYYY');
}
export function formatEasyDate(date) {
    return moment(date).fromNow();
}
export function isJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

export function register(dispatch, data, callback) {
    // const navigate = useNavigate();
    // dispatch(profileLoading());
    axios.post(`/signup`, data)
        .then(response => {
            const {data} = response;
            if (data.success) {
                console.log('Registration success');
                return callback(null, true);
                // navigate('login');
            } else {
                return callback(true);
                console.log('Registration failure');
            }
        });
}

export function checkSession(dispatch) {
    axios.get('/api/session')
        .then(response => {
            dispatch(handleLoginResponse(response));
        })
        .catch(err => {
            // console.log(err.message);
        });
}

export function getQuestionDetails(dispatch, id) {
    dispatch(questionDetailsLoading());
    axios.get(`/api/questions/${id}`)
        .then(response => {
            dispatch(handleQuestionDetailsResponse(response));
        })
        .catch(err => {
            console.log(err.message);
        });
}

export function loadQuestions(dispatch) {
    dispatch(questionsLoading());
    axios.get(`/api/questions`)
        .then(response => {
            dispatch(handleQuestionsResponse(response));
        })
        .catch(err => {
            console.log(err.message);
        });
}

export function getAnswers(dispatch, id) {
    axios.get(`/api/answers/${id}`)
        .then(response => {
            dispatch(handleAnswerResponse(response));
        })
        .catch(err => {
            console.log(err.message);
        });
}

export function searchQuestions(dispatch, searchQuery, sortBy) {
    const params = {};
    if (searchQuery && typeof searchQuery === 'string') {
        if (searchQuery.indexOf('user:') !== -1 && searchQuery.indexOf('[') !== -1 && searchQuery.indexOf(']') !== -1) {
            params.key = 'user_tag';
        } else if (searchQuery.indexOf('[') === 0 && searchQuery.indexOf(']') !== -1) {
                        alert("sunny");

            params.key = 'tag';
        } else if (searchQuery.indexOf('user:') !== -1) {
            params.key = 'user';
        } else if (searchQuery.indexOf('"') === 0 && searchQuery.indexOf('"') !== -1) {
            params.key = 'exactphrase';
        } else if (searchQuery.indexOf('is:question') !== -1) {
            params.key = 'question';
        } else if (searchQuery.indexOf('isaccepted:yes') !== -1) {
            params.key = 'answer';
        } else {
            params.key = 'exactphrase';
        }
        params.value = searchQuery;
    }
    if (sortBy) {
        params.tab = sortBy;
    }
    dispatch(questionSearchLoading());
    axios.get(`/api/searchQuestion`, { params })
        .then(response => {
            dispatch(handleQuesSearchResponse(response));
        })
        .catch(err => {
            console.log(err.message);
        });
}

export function postQuestion(dispatch, data, callback) {
    const tempObj = {...data, text: JSON.stringify(data.text)};
    axios.post(`/api/questions`, tempObj)
        .then(response => {
            const {data} = response;
            if (data.success) {
                // refresh categories
                dispatch(setToast({
                    type: 'success',
                    message: 'Question posted successfully!'
                }));
                return callback(null, true);
            }
            return callback(true);
        })
        .catch(err => {
            console.log(err.message);
        });
}

export function addQuestionComment(dispatch, qid, data, callback) {
    const commentObj = {
        body: data
    };
    axios.post(`/api/comments/${qid}`, commentObj)
        .then(response => {
            const {data} = response;
            if (data.success) {
                // refresh content
                dispatch(setToast({
                    type: 'success',
                    message: 'Comment added to the question successfully!'
                }));
                getQuestionDetails(dispatch, qid);
                return callback(null, true);
            }
            return callback(true);
        })
        .catch(err => {
            console.log(err.message);
        });
}

export function addAnswerComment(dispatch, inputData, callback) {
    const {qid, answerID, data} = inputData;
    const commentObj = {
        body: data
    };
    axios.post(`/api/comments/${qid}/${answerID}`, commentObj)
        .then(response => {
            const {data} = response;
            if (data.success) {
                // refresh content
                dispatch(setToast({
                    type: 'success',
                    message: 'Comment added to the answer successfully!'
                }));
                getQuestionDetails(dispatch, qid);
                return callback(null, true);
            }
            return callback(true);
        })
        .catch(err => {
            console.log(err.message);
        });
}

export function addAnswer(dispatch, questionID, data, callback) {
    const {text: {blocks}} = data;
    const answerObj = {
        text: JSON.stringify(blocks)
    };
    axios.post(`/api/answers/${questionID}`, answerObj)
        .then(response => {
            const {data} = response;
            if (data.success) {
                // refresh content
                dispatch(setToast({
                    type: 'success',
                    message: 'Answer added successfully!'
                }));
                getQuestionDetails(dispatch, questionID);
                return callback(null, true);
            }
            return callback(true);
        })
        .catch(err => {
            console.log(err.message);
        });
}

export function voteQuestion(dispatch, questionID, value) {
    const voteObj = {
        vote: value
    };
    axios.post(`/api/votes/question/${questionID}`, voteObj).then(response => {
            const {data} = response;
            if (data.success) {
                // refresh content
                dispatch(setToast({
                    type: 'success',
                    message: 'Question voted successfully!'
                }));
                getQuestionDetails(dispatch, questionID);
            }
        })
        .catch(err => {
            console.log(err.message);
        });
}

export function voteAnswer(dispatch, questionID, answerID, value) {
    const voteObj = {
        vote: value
    };
    axios.post(`/api/votes/answer/${questionID}/${answerID}`, voteObj).then(response => {
            const {data} = response;
            if (data.success) {
                // refresh content
                dispatch(setToast({
                    type: 'success',
                    message: 'Answer voted successfully!'
                }));
                getQuestionDetails(dispatch, questionID);
            }
        })
        .catch(err => {
            console.log(err.message);
        });
}

export function addBookmark(dispatch, questionID) {
    const bookmarkObj = {
        _id: questionID
    };
    axios.post(`/api/addbookmark`, bookmarkObj).then(response => {
            const {data} = response;
            if (data.success) {
                // refresh content
                dispatch(setToast({
                    type: 'success',
                    message: 'Question bookmarked!'
                }));
                getQuestionDetails(dispatch, questionID);
            }
        })
        .catch(err => {
            console.log(err.message);
        });
}

export function removeBookmark(dispatch, questionID) {
    const bookmarkObj = {
        _id: questionID
    };
    axios.post(`/api/deletebookmark`, bookmarkObj).then(response => {
            const {data} = response;
            if (data.success) {
                // refresh content
                dispatch(setToast({
                    type: 'success',
                    message: 'Question removed from bookmark!'
                }));
                getQuestionDetails(dispatch, questionID);
            }
        })
        .catch(err => {
            console.log(err.message);
        });
}

export function markAnswerAccepted(dispatch, questionID, answerID) {
    axios.post(`/api/markBestAnswer/${questionID}/${answerID}`).then(response => {
            const {data} = response;
            if (data.success) {
                // refresh content
                dispatch(setToast({
                    type: 'success',
                    message: 'Answer marked as accepted!'
                }));
                getQuestionDetails(dispatch, questionID);
            }
        })
        .catch(err => {
            console.log(err.message);
        });
}


export function getMessageThreads(dispatch) {
    dispatch(recipientsLoading());
    axios.get(`/api/messages/threads`)
        .then(response => {
            dispatch(handleRecipientsResponse(response));
        })
        .catch(err => {
            console.log(err.message);
        });
}

export function getMessages(dispatch, id) {
    dispatch(messagesLoading());
    axios.get(`/api/messages/${id}`)
        .then(response => {
            dispatch(handleMessagesResponse(id, response));
        })
        .catch(err => {
            console.log(err.message);
        });
}

export function sendMessage(dispatch, data, callback) {
    const {recipient, message} = data;
    axios.post(`/api/messages`, {
        recipientID: recipient, content: message
    }).then(response => {
        const {data} = response;
        if (data.success) {
            // refresh content
            return callback(null, true);
        }
        return callback(false);
    })
    .catch(err => {
        console.log(err.message);
    });
}

export async function fetchUsers() {
    const results = await axios.get(`/api/getUserDetails`);
    // console.log(results.data/);
    return results.data.data;
}

export async function mostViewedQuestions() {
    const results = await axios.get(`/api/mostViewedQuestions`);
    // console.log(results.data/);
    return results.data.data;
}
export async function fetchPopularTags() {
    const results = await axios.get(`/api/tags/getPopularTags`);
    // console.log(results.data/);
    return results.data.data;
}
export async function fetchTopUserReputation() {
    const results = await axios.get(`/api/getTopUserReputation`);
    // console.log(results.data/);
    return results.data.data;
}
export async function fetchLeastUserReputation() {
    const results = await axios.get(`/api/getLeastUserReputation`);
    // console.log(results.data/);
    return results.data.data;
}
export async function fetchQuestionsPostedToday() {
    const results = await axios.get(`/api/questionPostedCount`);
    // console.log(results.data/);
    return results.data.data;
}

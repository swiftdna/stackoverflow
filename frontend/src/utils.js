import { handleLoginResponse, setToast, handleCountriesResponse } from './actions/app-actions';
import { questionDetailsLoading, handleQuestionDetailsResponse, handleAnswerResponse } from './actions/question-details-actions';
import { questionsLoading, handleQuestionsResponse } from './actions/questions-actions';
import { questionSearchLoading, handleQuesSearchResponse } from './actions/questions-search-actions';
// import { useNavigate } from 'react-router-dom';

import axios from 'axios';

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
                getQuestionDetails(dispatch, questionID);
                return callback(null, true);
            }
            return callback(true);
        })
        .catch(err => {
            console.log(err.message);
        });
}
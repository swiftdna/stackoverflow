import { handleLoginResponse, setToast, handleCountriesResponse } from './actions/app-actions';
import { handleQuestionDetailsResponse, handleAnswerResponse } from './actions/question-details-actions';
// import { useNavigate } from 'react-router-dom';

import axios from 'axios';

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
    axios.get(`/api/questions/${id}`)
        .then(response => {
            dispatch(handleQuestionDetailsResponse(response));
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

export function postQuestion(dispatch, data, callback) {
    const tempObj = {...data, text: JSON.stringify(data.text)};
    axios.post(`/api/questions`, tempObj)
        .then(response => {
            const {data} = response;
            if (data.success) {
                // refresh categories
                return callback(null, true);
            }
            return callback(false);
        })
        .catch(err => {
            console.log(err.message);
        });
}
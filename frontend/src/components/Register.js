import React, {useState} from 'react';
import {Form, Button} from 'react-bootstrap';
import { register } from '../utils';
import { setAlert } from '../actions/app-actions';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Register() {

	const [regForm, setRegForm] = useState({
		email: '',
		password: '',
		username: ''
	});
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const onInputChange = (e) => {
		const tmpForm = {...regForm};
		const name = e.target.getAttribute('id');
		tmpForm[name] = e.target.value;
		setRegForm(tmpForm);
	}

	const submitRegister = () => {
		console.log('regForm => ', regForm);
		register(dispatch, regForm, (err, successFlag) => {
			if (successFlag) {
				dispatch(setAlert({
					type: 'success',
					message: 'Registration successful. Please login now'
				}));
				navigate('/login');
			}
		});
	};

	const reset = () => {
		setRegForm({
			email: '',
			password: '',
			username: ''
		});
	}

	return (
		<div className="container pull-down fill-page">
			<h5>Registration Form</h5>
			<Form>
				<Form.Group className="mb-3" controlId="username">
					<Form.Label>Username</Form.Label>
					<Form.Control
					    type="text"
					    value={regForm.username}
					    onChange={onInputChange}
					    aria-describedby="username"
					/>
				</Form.Group>

				<Form.Group className="mb-3" controlId="email">
					<Form.Label>email</Form.Label>
					<Form.Control
					    type="text"
					    value={regForm.email}
					    onChange={onInputChange}
					    aria-describedby="email"
					/>
				</Form.Group>

				<Form.Group className="mb-3" controlId="password">
					<Form.Label>Password</Form.Label>
					<Form.Control
					    type="password"
					    value={regForm.password}
					    onChange={onInputChange}
					    aria-describedby="password"
					/>
				</Form.Group>
			</Form>

			<div className="btn_panel">
				<Button variant="primary" onClick={() => submitRegister()}>Submit</Button>
				<Button variant="secondary" onClick={() => reset()}>Reset</Button>
			</div>

		</div>
	)
}
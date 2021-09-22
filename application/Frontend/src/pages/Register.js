import React from 'react';
import Axios from 'axios';
import { Redirect, Switch, Route, Link } from 'react-router-dom';
import logo from '../images/Logo.png';
import Footer from './Footer';

import '../styles/Form.css';

const Registration = () => {
	const [ appUser, setAppUser ] = React.useState('');
	const [ uname, setUsername ] = React.useState('');
	const [ password, setPassword ] = React.useState('');
	const [ fname, setFname ] = React.useState('');
	const [ lname, setLname ] = React.useState('');
	const [ email, setEmail ] = React.useState('');

	const [ error, setError ] = React.useState('');
	const [ isLoggedIn, setIsLoggedIn ] = React.useState(false);

	// booleans for password validations
	const [ containsUL, setContainsUL ] = React.useState(false); // uppercase letter
	const [ containsLL, setContainsLL ] = React.useState(false); // lowercase letter
	const [ containsN, setContainsN ] = React.useState(false); // number
	const [ containsSC, setContainsSC ] = React.useState(false); // special character
	const [ contains8C, setContains8C ] = React.useState(false); // min 8 characters

	const [ confirmingPassword, setconfirmPassword ] = React.useState(false); // Confirming Password

	// checks all validations are true
	const [ allValid, setAllValid ] = React.useState(false);

	const handleSignup = () => {
		console.log(uname);
		const body = {
			uname: uname,
			password: password,
			fname: fname,
			lname: lname,
			email: email
		};
		// eslint-disable-next-line no-restricted-globals
		event.preventDefault();
		Axios.post('/users/api/addUser', body)
			.then((res) => {
				console.log(res.data);
				if (res.data.success) {
					// it worked
					setIsLoggedIn(true);
					setAppUser(uname);
					//addLiveUser(username);
				} else {
					// Auth Error
					setError(res.data.response);
					alert(res.data.response);
				}
			})
			.catch(() => {
				setError('Failed to Register Account');
			});
	};

	if (isLoggedIn && appUser) return <Redirect to="/login" />;

	const validatePassword = () => {
		// has uppercase letter
		if (password.toLowerCase() != password) setContainsUL(true);
		else setContainsUL(false);

		// has lowercase letter
		if (password.toUpperCase() != password) setContainsLL(true);
		else setContainsLL(false);

		// has number
		if (/\d/.test(password)) setContainsN(true);
		else setContainsN(false);

		// has special character
		if (/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(password)) setContainsSC(true);
		else setContainsSC(false);

		// has 8 characters
		if (password.length >= 8) setContains8C(true);
		else setContains8C(false);

		// all validations passed
		if (containsUL && containsLL && containsN && containsSC && contains8C) {
			setAllValid(true);
			document.getElementById('passwordValidation').innerHTML = '&#10003;';
		} else {
			setAllValid(false);
			document.getElementById('passwordValidation').innerHTML = '&#10007;';
		}
	};

	//confirming the password
	function confirmPassword() {
		let originalPassword = document.getElementById('password').value;
		let confirmPassword = document.getElementById('confirm').value;

		if (originalPassword === confirmPassword) {
			document.getElementById('confirmPasswordCheck').innerHTML = '&#10003;';
			setconfirmPassword(true);
			return true;
		} else {
			document.getElementById('confirmPasswordCheck').innerHTML = '&#10007;';
			setconfirmPassword(false);
			return false;
		}
	}

	//clearing all the tags
	function clearingTags() {
		document.getElementById('passwordValidation').innerHTML = '';
		document.getElementById('confirmPasswordCheck').innerHTML = '';
	}

	return (
		<div>
			<header className="App-header">
				<Link to="/Home">
					<img src={logo} />
				</Link>
			</header>
			<form className="App-body Register-Login-Form" onSubmit={handleSignup}>
				<h1>Registration</h1>

				<fieldset>
					<div className="Line">
						<label> First Name </label>
						<input
							placeholder="First Name"
							value={fname}
							onChange={(e) => setFname(e.target.value)}
							required
						/>
					</div>

					<div className="Line">
						<label> Last Name </label>
						<input
							placeholder="Last Name"
							value={lname}
							onChange={(e) => setLname(e.target.value)}
							required
						/>
					</div>

					<div className="Line">
						<label> Email </label>
						<input
							placeholder="Email"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</div>

					<div className="Line">
						<label> Username </label>
						<input
							placeholder="Username"
							value={uname}
							onChange={(e) => setUsername(e.target.value)}
							required
						/>
					</div>

					<div className="Line">
						<label>Password</label>
						<input
							placeholder="Password"
							type="password"
							id="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							onKeyUp={validatePassword}
							required
						/>
						<label id="passwordValidation"> </label>
					</div>

					<div>
						<label className="Password-requirements-title">Password needs to have:</label>
						<ul className="Password-requirements">
							<li>An uppercase letter</li>
							<li>A lowercase letter </li>
							<li>A special character like !@#$^&*+=\:?</li>
							<li>At least 8 characters</li>
						</ul>
					</div>

					<div className="Line">
						<label>Confirm Password</label>
						<input
							placeholder="Confirm Password"
							type="password"
							id="confirm"
							onChange={confirmPassword}
							required
						/>
						<label id="confirmPasswordCheck"> </label>
					</div>
				</fieldset>

				<fieldset>
					<button
						className="btn btn-primary btn-sm m-2"
						value="submit"
						type="submit"
						disabled={!uname || !password || !allValid || !confirmingPassword}
						onSubmit={handleSignup}
					>
						{' '}
						Submit{' '}
					</button>
				</fieldset>

				<div class="text-danger">{error && <strong> {error} </strong>}</div>
			</form>

			<fieldset>
				<label class="text-info">
					Creating an Account means you agree to the <a href="">Terms of Service</a>
				</label>
			</fieldset>

			<fieldset>
				<label>Already have an account?</label>
				<a href="/Login" className="badge m-2 badge-secondary">
					Click here to Login
				</a>
			</fieldset>

			<Footer />
		</div>
	);
};

export default Registration;

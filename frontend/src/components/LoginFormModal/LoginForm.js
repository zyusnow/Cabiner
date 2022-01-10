import React, { useState } from 'react';
// import { Modal } from '../../context/Modal';
import { Link } from "react-router-dom";
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import './LoginForm.css';


function LoginForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const DemoLogin = (e) => {
    e.preventDefault();
    const demoUser = {
      credential:"Demo-lition",
      password:"password"
    }
    dispatch(login(demoUser))
  }

  if (sessionUser) return (
    <Redirect to="/" />
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  }

  return (
    <div className='login_container'>
      <div className='login_title'>Log in or sign up</div>
      <div className='login_subTitle'>Welcome to Cabiner</div>
      <div className='login_form_container'>
        <form className='login_form' onSubmit={handleSubmit}>
          <ul>
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
          </ul>
            <div className='login_input'>
              <input
                type="text"
                value={credential}
                onChange={(e) => setCredential(e.target.value)}
                required
                placeholder='Username or email'
              />
              <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder='Password'
            />
          </div>


          <button className='login_btn'type="submit">Log In</button>
          <div className='addition'>
            Don't have a account?
            <Link className='link' to="/signup">Sign Up</Link>
          </div>
            {!sessionUser &&
            <button className='demo' onClick={e=>DemoLogin(e)}><nav>Log in as demo</nav></button>
            }
        </form>
        </div>

    </div>

  );
}

export default LoginForm;

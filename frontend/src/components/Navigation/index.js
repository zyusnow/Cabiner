import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';
import SignupFormModal from '../SignupFormModal';
import { login } from '../../store/session';

function Navigation({ isLoaded }){
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);

  const DemoLogin = (e) => {
    e.preventDefault();
    const demoUser = {
      credential:"Demo-lition",
      password:"password"
    }
    dispatch(login(demoUser))
  }

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <SignupFormModal />
        {/* <NavLink to="/signup">Sign Up</NavLink> */}
      </>
    );
  }

  return (
    <div>
      <div>
        <NavLink exact to="/">Home</NavLink>
      </div>
      <div>
      {!sessionUser &&
        <button onClick={e=>DemoLogin(e)}><nav>Demo</nav></button>
        }
      </div>
      <div>
        {isLoaded && sessionLinks}
      </div>

    </div>
  );
}

export default Navigation;

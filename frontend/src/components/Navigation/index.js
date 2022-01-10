import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';
import SignupFormModal from '../SignupFormModal';


function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  // demo shown on the home page
  // const DemoLogin = (e) => {
  //   e.preventDefault();
  //   const demoUser = {
  //     credential:"Demo-lition",
  //     password:"password"
  //   }
  //   dispatch(login(demoUser))
  // }

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
    <div className='nav_container'>
        <div className='nav_left'>
          <NavLink to='/'>
            <img className="nav_logo" alt='logo' src='../../images/logo/nav_logo.png' />
          </NavLink>
          <NavLink className='nav_head'exact to="/">cabiner</NavLink>
        </div>
      {/* <div>
      {!sessionUser &&
        <button onClick={e=>DemoLogin(e)}><nav>Demo</nav></button>
        }
      </div> */}
      <div className='nav_right'>
        {isLoaded && sessionLinks}
      </div>
      <div className='flexible_container'>
          <div className='not_sure'>Not sure where to go? Perfect.</div>
          <button className='flexible_btn'><span>I'm flexible</span></button>
        </div>
    </div>
  );
}

export default Navigation;

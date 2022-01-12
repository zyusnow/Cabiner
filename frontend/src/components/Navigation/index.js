import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import { useHistory } from 'react-router';
import SignupFormModal from '../SignupFormModal';
import './Navigation.css';


function Navigation({ isLoaded }){
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);
  const goToSpots=(e)=>{
    e.preventDefault();
    history.push('/spots');
  }
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
      <div className='sub_nav_container'>
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
      </div>
    </div>
  );
}

export default Navigation;

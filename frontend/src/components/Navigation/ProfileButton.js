import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import {useHistory} from 'react-router';
import * as sessionActions from '../../store/session';
import { NavLink } from 'react-router-dom';
import NewSpotFormModal from "../NewSpotFormModal";
import './Navigation.css';


function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const sessionUser = useSelector(state => state.session.user);
  const history = useHistory();


  const openMenu = (e) => {
    e.preventDefault();
    setShowMenu(!showMenu);
    // if (showMenu) return;
    // setShowMenu(true);
  };

  // useEffect(() => {
  //   if (!showMenu) return;

  //   const closeMenu = () => {
  //     setShowMenu(false);
  //   };

  //   document.addEventListener('click', closeMenu);

  //   return () => document.removeEventListener("click", closeMenu);
  // }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push('/')
  };

  const manageSpots = (e) => {
    e.preventDefault();
    if(sessionUser) {
      history.push(`/users/${sessionUser.id}/spots`)
    }
  }

  const goToAdd=(e)=>{
    e.preventDefault();
    history.push('/spots/add');
  }
  return (
    <>
      <div className="nav_left_username">Welcome, {user.username}!</div>
      <button className='nav_menu' onClick={openMenu}>
        {/* <img className="usericon" alt="img" src="../../../user.png" onClick={openMenu}></img> */}
        <i className="fas fa-bars"></i>
        <i className="fas fa-user-circle"></i>
      </button>
      {showMenu && (
        <div>
          <div className="profile-dropdown">

            {/* <NewSpotFormModal/> */}
            <div className='manageSpots' onClick={goToAdd}>Add a spot</div>
            {/* <div className='manageSpots' onClick={manageSpots}>Manage spots</div> */}
            <div className='dropdown_logout' onClick={logout}>Log Out</div>
          </div>
        </div>

      )}
    </>
  );
}
            {/* <div>{user.username}</div> */}
            {/* <div>Add a spot</div> */}
export default ProfileButton;

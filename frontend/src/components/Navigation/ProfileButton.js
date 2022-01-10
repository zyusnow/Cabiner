import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import './Navigation.css';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

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
            <div>{user.username}</div>
            <div>{user.email}</div>
            <div className='dropdown_logout' onClick={logout}>Log Out</div>
        </div>
        </div>

      )}
    </>
  );
}

export default ProfileButton;

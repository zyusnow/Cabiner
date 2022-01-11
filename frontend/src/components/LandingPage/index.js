import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import "./LandingPage.css"


function LandingPage(){
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);
  const goToSpots=(e)=>{
    e.preventDefault();
    history.push('/spots');
  }
  return (

      <div className='flexible_container'>
          <div className='not_sure'>Not sure where to go? Perfect.</div>
          <button className='flexible_btn' onClick={e=>goToSpots(e)}><span>I'm flexible</span></button>
          {/* <button className='flexible_btn'><a href="/spots">I'm flexible</a></button> */}
        </div>
  );
}

export default LandingPage;

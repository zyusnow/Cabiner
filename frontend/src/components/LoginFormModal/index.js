import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';
import './LoginForm.css';


function LoginFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
    <div className='login_home'>
      <div className='login_btn_home' onClick={() => setShowModal(true)}>Log In</div>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <LoginForm />
          </Modal>
        )}
    </div>
    </>
  );
}

export default LoginFormModal;

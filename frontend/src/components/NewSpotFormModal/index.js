import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import NewSpotForm from './NewSpotForm';


function NewSpotFormModal(){
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div className='addSpot_btn' onClick={() => setShowModal(true)}>Add a spot</div>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <NewSpotForm />
          </Modal>
        )}
   </>
  );
}


export default NewSpotFormModal;

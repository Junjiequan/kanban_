import React from 'react';

const Modal = (props: any) => {
  const { modal, closeModal } = props;
  if (!modal) return null;
  return (
    <div className='Overlay' onClick={() => closeModal({})}>
      <div className='Modal' onClick={(e) => e.stopPropagation()}>
        {props.children}
      </div>
    </div>
  );
};

export default Modal;

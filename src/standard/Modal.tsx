import React from 'react';
import { useAppDispatch } from '../hooks/useRedux';
import { closeModal } from '../reducer/modalSlice';

const Modal = (props: { children: JSX.Element }) => {
  const dispatch = useAppDispatch();

  return (
    <div className='Overlay' onClick={() => dispatch(closeModal())}>
      <div className='Modal' onClick={(e) => e.stopPropagation()}>
        {props.children}
      </div>
    </div>
  );
};

export default Modal;

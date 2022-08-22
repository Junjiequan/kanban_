import React, { useEffect } from 'react';
import { Cross } from '../data/icons';
import { useAppDispatch } from '../hooks/useRedux';
import { closeModal } from '../reducer/modalSlice';

const Modal = (props: { children: JSX.Element }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleCloseModal = (e: KeyboardEvent) => {
      if (e.code === 'Escape') {
        dispatch(closeModal());
        (document.activeElement as HTMLElement).blur();
      }
    };
    document.addEventListener('keydown', handleCloseModal);
    return () => document.removeEventListener('keydown', handleCloseModal);
  }, []);
  return (
    <div className='Overlay' onClick={() => dispatch(closeModal())}>
      <div className='Modal' onClick={(e) => e.stopPropagation()}>
        <button className='Modal--close' onClick={() => dispatch(closeModal())}>
          <Cross />
        </button>

        {props.children}
      </div>
    </div>
  );
};

export default Modal;

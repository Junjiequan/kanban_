import React from 'react';
import Button from '../../standard/Button';
import { IconEllipsis } from '../../data/icons';
import { openModal } from '../../reducer/modalSlice';
import { useAppDispatch } from '../../hooks/useRedux';

const Launch = () => {
  const dispatch = useAppDispatch();

  return (
    <div className='Launch'>
      <h1 className='Launch__title'>Platform Launch</h1>
      <div className='Launch__buttons'>
        <Button onClick={() => dispatch(openModal({ ModalType: 'AddNewTask' }))}> + Add New task</Button>
        <button className='Launch__button-ellipsis' onClick={() => dispatch(openModal({ ModalType: 'EditBoard' }))}>
          <IconEllipsis />
        </button>
      </div>
    </div>
  );
};

export default Launch;

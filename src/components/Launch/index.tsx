import React from 'react';
import Button from '../../standard/Button';
import { IconEllipsis } from '../../data/icons';
import { closeModal, openModal } from '../../reducer/modalSlice';
import { useAppDispatch } from '../../hooks/useRedux';

const Launch = () => {
  const dispatch = useAppDispatch();
  const onOpenModal = (modal: string) => {
    dispatch(openModal(modal));
  };

  return (
    <div className='Launch'>
      <h1 className='Launch__title'>Platform Launch</h1>
      <div className='Launch__buttons'>
        <Button onClick={() => onOpenModal('ViewTask')}> + Add New task</Button>
        <button className='Launch__button-ellipsis' onClick={() => onOpenModal('AddBoard')}>
          <IconEllipsis />
        </button>
      </div>
    </div>
  );
};

export default Launch;

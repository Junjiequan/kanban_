import React, { useState, useCallback } from 'react';
import Button from '../../standard/Button';
import { IconEllipsis } from '../../data/icons';
import { openModal } from '../../reducer/modalSlice';
import { useAppDispatch } from '../../hooks/useRedux';
import DropDown from '../../standard/DropDown';

const Launch = () => {
  const dispatch = useAppDispatch();
  const [openDronDown, setOpenDropDown] = useState(false);

  return (
    <div className='Launch'>
      <h1 className='Launch__title'>Platform Launch</h1>
      <div className='Launch__buttons'>
        <Button onClick={() => dispatch(openModal({ ModalType: 'AddNewTask' }))}> + Add New task </Button>
        <button
          className='Launch__button-ellipsis'
          data-dropdown-toggle
          onClick={() => setOpenDropDown((prev) => !prev)}
        >
          <IconEllipsis />
        </button>
        {openDronDown && (
          <DropDown
            text={'task'}
            setOpenDropDown={setOpenDropDown}
            onEdit={() => dispatch(openModal({ ModalType: 'EditTask' }))}
            onDelete={() => dispatch(openModal({ ModalType: 'DeleteTask' }))}
          />
        )}
      </div>
    </div>
  );
};

export default Launch;

import React from 'react';
import Modal from '../../standard/Modal';
import { IModal } from '../../data/type';
import DropDown from '../../standard/DropDown';
import { openModal } from '../../reducer/modalSlice';
import { useAppDispatch } from '../../hooks/useRedux';

const ViewTask = (props: IModal) => {
  const { ModalDetail } = props;
  const dispatch = useAppDispatch();
  const countCompleted = ModalDetail.subtasks?.filter((item: any) => item.isCompleted === true);
  if (!Object.keys(ModalDetail).length) return null;
  return (
    <Modal>
      <div className='ViewTask'>
        <div className='ViewTask__title'>
          <h1>{ModalDetail.title} </h1>
          <DropDown
            text='task'
            onEdit={() => dispatch(openModal({ ModalType: 'EditTask' }))}
            onDelete={() => dispatch(openModal({ ModalType: 'DeleteTask' }))}
          />
        </div>
        <p>{ModalDetail.description}</p>
        <p>
          {' '}
          {countCompleted?.length} of {ModalDetail.subtasks?.length} subtasks
        </p>
        {ModalDetail.subtasks.map((i: any, index: number) => (
          <div key={index}>{i.title}</div>
        ))}
        <div>
          Current Status <br /> {ModalDetail.status}
        </div>
      </div>
    </Modal>
  );
};

export default ViewTask;

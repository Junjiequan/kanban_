import React from 'react';
import Modal from '../../standard/Modal';
import { IModal } from '../../data/type';

const ViewTask = (props: IModal) => {
  const { ModalDetail } = props;
  const countCompleted = ModalDetail.subtasks?.filter((item: any) => item.isCompleted === true);
  if (!Object.keys(ModalDetail).length) return null;
  return (
    <Modal>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'start',
          width: '100%',
        }}
      >
        <h1>{ModalDetail.title}</h1>
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

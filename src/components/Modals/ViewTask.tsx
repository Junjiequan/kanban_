import React from 'react';
import Modal from '../../standard/Modal';
import { IModal } from '../../data/type';

const ViewTask = (props: IModal) => {
  const { ModalDetail } = props;
  return (
    <Modal>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'start',
          width: '100%',
          border: '1px solid red',
        }}
      >
        ViewTask <button onClick={() => console.log('hello fucker')}>asdas</button>
        asdjoiasdijosad
        <br />
        asdasdasd
      </div>
    </Modal>
  );
};

export default ViewTask;

import React from 'react';
import Modal from '../../standard/Modal';

const ViewTask = (props: any) => {
  return (
    <Modal {...props}>
      ViewTask <button onClick={() => console.log('hello fucker')}>asdas</button>
    </Modal>
  );
};

export default ViewTask;

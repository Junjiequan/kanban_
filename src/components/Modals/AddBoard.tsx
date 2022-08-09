import React from 'react';
import Modal from '../../standard/Modal';
import { IModal } from '../../data/type';

const AddBoard = (props: IModal) => {
  return (
    <Modal {...props}>
      {/* AT LEAST 1 column */}

      <>Create New Board</>
    </Modal>
  );
};

export default AddBoard;

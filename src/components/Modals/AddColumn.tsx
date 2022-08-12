import React from 'react';
import Modal from '../../standard/Modal';
import { IModal } from '../../data/type';

const AddColumn = (props: IModal) => {
  return (
    <Modal {...props}>
      {/* AT LEAST 1 column */}

      <>Create New Column</>
    </Modal>
  );
};

export default AddColumn;

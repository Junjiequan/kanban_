import React from 'react';
import ViewTask from './ViewTask';
import AddBoard from './AddBoard';
import AddNewTask from './AddNewTask';
import EditTask from './EditTask';
import EditBoard from './EditBoard';
import DeleteBoard from './DeleteBoard';
import DeleteTask from './DeleteTask';
import { useAppSelector } from '../../hooks/useRedux';

const Modals = () => {
  const getModal = useAppSelector((state) => state.modal);
  return (
    <>
      {getModal.ModalType === 'ViewTask' && <ViewTask {...getModal} />}
      {getModal.ModalType === 'AddBoard' && <AddBoard {...getModal} />}
      {getModal.ModalType === 'AddNewTask' && <AddNewTask {...getModal} />}
      {getModal.ModalType === 'EditTask' && <EditTask {...getModal} />}
      {getModal.ModalType === 'EditBoard' && <EditBoard {...getModal} />}
      {getModal.ModalType === 'DeleteBoard' && <DeleteBoard {...getModal} />}
      {getModal.ModalType === 'DeleteTask' && <DeleteTask {...getModal} />}
    </>
  );
};

export default Modals;

import React from 'react';
import ViewTask from './ViewTask';
import AddBoard from './AddBoard';
import AddColumn from './AddColumn';
import AddNewTask from './AddNewTask';
import EditTask from './EditTask';
import EditBoard from './EditBoard';
import DeleteBoard from './DeleteBoard';
import DeleteTask from './DeleteTask';
import { useAppSelector } from '../../hooks/useRedux';

const Modals = () => {
  const boardTab = useAppSelector((state) => state.boardTab);
  const getModal = useAppSelector((state) => state.modal);
  return (
    <>
      {getModal.ModalType === 'ViewTask' && <ViewTask {...getModal} boardTab={boardTab} />}
      {getModal.ModalType === 'AddBoard' && <AddBoard {...getModal} boardTab={boardTab} />}
      {getModal.ModalType === 'AddNewTask' && <AddNewTask {...getModal} boardTab={boardTab} />}
      {getModal.ModalType === 'AddColumn' && <AddColumn {...getModal} boardTab={boardTab} />}
      {getModal.ModalType === 'EditTask' && <EditTask {...getModal} boardTab={boardTab} />}
      {getModal.ModalType === 'EditBoard' && <EditBoard {...getModal} boardTab={boardTab} />}
      {getModal.ModalType === 'DeleteBoard' && <DeleteBoard {...getModal} boardTab={boardTab} />}
      {getModal.ModalType === 'DeleteTask' && <DeleteTask {...getModal} boardTab={boardTab} />}
    </>
  );
};

export default Modals;

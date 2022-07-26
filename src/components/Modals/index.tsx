import React from 'react';
import ViewTask from './ViewTask';
import AddBoard from './AddBoard';
import AddNewTask from './AddNewTask';
import EdlitTask from './EdlitTask';
import EditBoard from './EditBoard';
import DeleteBoard from './DeleteBoard';
import DeleteTask from './DeleteTask';

const Modals = (props: any) => {
  if (!props.modal) return null;
  return (
    <>
      {props.modal.ViewTask && <ViewTask {...props} />}
      {props.modal.AddNewTask && <AddNewTask {...props} />}
      {props.modal.AddBoard && <AddBoard {...props} />}
      {props.modal.AddNewTask && <EdlitTask {...props} />}
      {props.modal.EdlitTask && <EditBoard {...props} />}
      {props.modal.EditBoard && <AddBoard {...props} />}
      {props.modal.DeleteBoard && <DeleteBoard {...props} />}
      {props.modal.DeleteTask && <DeleteTask {...props} />}
    </>
  );
};

export default Modals;

import { ChangeEvent, FormEvent, useState } from 'react';
import { IModal, ISubTask } from '../../data/type';
import Modal from '../../standard/Modal';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { editTask } from '../../reducer/dataSlice';
import { Cross } from '../../data/icons';
import Button from '../../standard/Button';
import SelectDropDown from '../../standard/SelectDropDown';
import { openModal } from '../../reducer/modalSlice';

const EditTask = (props: IModal) => {
  const { ModalDetail, boardTab } = props;
  const dispatch = useAppDispatch();
  const boardData = useAppSelector((state) => state.data);
  const boardStatus = boardData.currentBoardStatus;
  const [newTask, setNewTask] = useState({
    title: ModalDetail.title,
    description: ModalDetail.description,
    subtasks: ModalDetail.subtasks.map((item: ISubTask) => ({ title: item.title, isCompleted: item.isCompleted })),
    status: ModalDetail.status,
    statusId: ModalDetail.statusId,
  });

  const onSetCurrentStatus = (value: string, index: number) => {
    setNewTask({ ...newTask, status: value, statusId: index });
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();

    //TODO prevent edit in duplicated title
    //Refactor below later start
    const targetBoard = boardData.data.find((item) => item.name === boardTab);
    const isDuplicated = targetBoard!.columns!.find((column) =>
      column.tasks?.find((task) => task.title === newTask.title)
    );
    if (isDuplicated && newTask.title !== ModalDetail.title) {
      alert('Same title is used');
      return;
    }
    if (!newTask.title || !newTask.description) {
      alert('TODO - add form validation');
      return;
    }
    // end
    dispatch(openModal({ ModalType: 'EditTask', ModalDetail: newTask }));
    dispatch(editTask({ currentBoard: boardTab, newTask: newTask, oldTask: ModalDetail }));
  };

  const handleAddNewSubTask = () => {
    const subTask = newTask.subtasks.slice();
    subTask.push({ title: '', isCompleted: false });
    setNewTask({ ...newTask, subtasks: subTask });
  };

  const handleDeleteSubTask = (index: number) => {
    const subTask = newTask.subtasks.slice();
    subTask.splice(index, 1);
    setNewTask({ ...newTask, subtasks: subTask });
  };

  const onSubtasksChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const subTask = newTask.subtasks.slice();
    subTask[index] = { title: e.target.value, isCompleted: subTask[index].isCompleted };

    setNewTask({ ...newTask, subtasks: subTask });
  };

  return (
    <Modal>
      <form className='AddNewTask' onSubmit={handleFormSubmit}>
        <div className='AddNewTask__topWrapper'>
          <h2>Edit Task</h2>
        </div>
        <div className='AddNewTask__boxWrapper'>
          <p className='AddNewTask__sub-title'>Title</p>
          <input type='text' value={newTask.title} name='title' onChange={handleInputChange} />
        </div>
        <div className='AddNewTask__boxWrapper'>
          <p className='AddNewTask__sub-title'>Description</p>
          <textarea
            className='AddNewTask__description'
            value={newTask.description}
            rows={4}
            name='description'
            onChange={handleInputChange}
          />
        </div>
        <div className='AddNewTask__boxWrapper'>
          <p className='AddNewTask__sub-title'>Subtasks</p>
          <ul className='AddNewTask__subtaskUl'>
            {newTask.subtasks.map((item: ISubTask, index: number) => {
              return (
                <li className='AddNewTask__subtaskLi' key={index}>
                  <input
                    className='AddNewTask__subtask__input'
                    type='text'
                    value={item.title}
                    onChange={(e) => onSubtasksChange(e, index)}
                  />
                  <button type='button' className='' onClick={() => handleDeleteSubTask(index)}>
                    <Cross />
                  </button>
                </li>
              );
            })}
          </ul>
          <Button small colorTheme onClick={handleAddNewSubTask} style={{ marginTop: '0.5rem' }}>
            + Add New Subtask
          </Button>
        </div>
        <div className='AddNewTask__boxWrapper AddNewTask__status'>
          <p className='AddNewTask__sub-title'>Status</p>
          <SelectDropDown
            status={boardStatus}
            currentStatus={newTask.statusId ? boardStatus[newTask.statusId] : boardStatus[0]}
            onSetCurrentStatus={onSetCurrentStatus}
          />
        </div>
        <div className='AddNewTask__boxWrapper'>
          <Button small type='submit'>
            Save Changes
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default EditTask;

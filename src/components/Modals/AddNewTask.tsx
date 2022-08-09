import { ChangeEvent, FormEvent, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/useRedux';
import { IModal, ISubTask } from '../../data/type';
import SelectDropDown from '../../standard/SelectDropDown';
import Modal from '../../standard/Modal';
import Button from '../../standard/Button';
import { Cross } from '../../data/icons';

import { addTask } from '../../reducer/dataSlice';

const AddNewTask = (props: IModal) => {
  const { Status } = props;
  const dispatch = useAppDispatch();
  const status = ['todo', 'doing', 'done'];
  const boardTab = useAppSelector((state) => state.boardTab);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    subtasks: [
      { title: '', isCompleted: false },
      { title: '', isCompleted: false },
    ],
    status: status[0],
  });
  const onSetCurrentStatus = (value: string) => {
    setNewTask({ ...newTask, status: value });
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!newTask.title || !newTask.description) {
      alert('TODO - add form validation');
      return;
    }
    dispatch(addTask({ currentBoard: boardTab, newTask: newTask }));
  };

  const handleAddNewSubTask = () => {
    const subTask = newTask.subtasks.slice();
    subTask.push({ title: '', isCompleted: false });
    setNewTask({ ...newTask, subtasks: subTask });
  };

  const handleDeleteSubTask = (index: number) => {
    if (newTask.subtasks.length > 1) {
      newTask.subtasks.splice(index, 1);
    }
    setNewTask({ ...newTask, subtasks: newTask.subtasks });
  };

  const onSubtasksChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const subTask = newTask.subtasks.slice();
    subTask[index].title = e.target.value;
    setNewTask({ ...newTask, subtasks: subTask });
  };

  return (
    <Modal>
      <form className='AddNewTask' onSubmit={handleFormSubmit}>
        <div className='AddNewTask__topWrapper'>
          <h2>Add New Task</h2>
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
                    value={newTask.subtasks[index].title}
                    onChange={(e) => onSubtasksChange(e, index)}
                  />
                  <button className='' onClick={() => handleDeleteSubTask(index)}>
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
          <SelectDropDown status={status} currentStatus={newTask.status} onSetCurrentStatus={onSetCurrentStatus} />
        </div>
        <div className='AddNewTask__boxWrapper'>
          <Button small type='submit'>
            Create Task
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddNewTask;

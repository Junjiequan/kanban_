import { ChangeEvent, useState } from 'react';
import { IModal } from '../../data/type';
import SelectDropDown from '../../standard/SelectDropDown';
import Modal from '../../standard/Modal';
import { FormEvent } from 'react';

const AddNewTask = (props: IModal) => {
  const { Status } = props;
  const status = ['todo', 'doing', 'done'];

  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    subtasks: '',
    status: status[0],
  });

  const onSetCurrentStatus = (value: string) => {
    setNewTask({ ...newTask, status: value });
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('form', newTask);
  };

  return (
    <Modal>
      <form className='AddNewTask' onSubmit={handleFormSubmit}>
        <div className='AddNewTask__topWrapper'>
          <h2>Add New Task</h2>
        </div>
        <div className='AddNewTask__titleWrapper'>
          <p className='AddNewTask__sub-title'>Title</p>
          <input type='text' name='title' onChange={handleInputChange} />
        </div>
        <div className='AddNewTask__descriptionWrapper'>
          <p className='AddNewTask__sub-title'>Description</p>
          <input type='text' name='description' onChange={handleInputChange} />
        </div>
        <div className='AddNewTask__subtaskWrapper'>
          <p className='AddNewTask__sub-title'>Subtasks</p>
          <input type='text' name='subtasks' onChange={handleInputChange} />
        </div>
        <div className='AddNewTask__statusWrapper'>
          <SelectDropDown status={status} currentStatus={newTask.status} onSetCurrentStatus={onSetCurrentStatus} />
        </div>
        <div className='AddNewTask__submitWrapper'>
          <button type='submit'>submit</button>
        </div>
      </form>
    </Modal>
  );
};

export default AddNewTask;

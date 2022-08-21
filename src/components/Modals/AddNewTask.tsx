import { useAppSelector, useAppDispatch } from '../../hooks/useRedux';
import { IModal, ISubTask, ITask } from '../../data/type';
import SelectDropDown from '../../standard/SelectDropDown';
import Modal from '../../standard/Modal';
import Button from '../../standard/Button';
import { Cross } from '../../data/icons';

import { addTask } from '../../reducer/dataSlice';
import { closeModal } from '../../reducer/modalSlice';
import { nanoid } from '@reduxjs/toolkit';
import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form';

const AddNewTask = (props: IModal) => {
  const { boardTab } = props;
  const dispatch = useAppDispatch();
  const boardData = useAppSelector((state) => state.data);
  const boardStatus = boardData.currentBoardStatus;
  const targetBoard = boardData.data.find((item) => item.name === boardTab);

  const {
    register,
    setValue,
    getValues,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<ITask>({
    defaultValues: {
      id: nanoid(),
      title: '',
      description: '',
      subtasks: [{ title: '', isCompleted: false }],
      status: boardStatus[0],
    },
  });
  const status = getValues().status;
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'subtasks',
  });
  const isDuplicatedName = (value = '') => {
    if (!targetBoard?.columns) return;
    return !targetBoard.columns.find((column) =>
      column.tasks?.find((task) => task.title?.toLowerCase() == value.toLowerCase())
    );
  };

  const onSetCurrentStatus = (value: string) => {
    setValue('status', value, { shouldValidate: true });
  };

  const onSubmit: SubmitHandler<ITask> = (data) => {
    dispatch(addTask({ currentBoard: boardTab, newTask: data }));
    dispatch(closeModal());
  };

  const handleAddNewSubTask = () => {
    if (fields.length > 6) return;
    append({ title: '', isCompleted: false });
  };

  return (
    <Modal>
      <form className='AddNewTask' onSubmit={handleSubmit(onSubmit)}>
        <div className='AddNewTask__topWrapper'>
          <h2>Add New Task</h2>
        </div>
        <div className='AddNewTask__boxWrapper'>
          <p className='AddNewTask__sub-title'>Title</p>
          <label className={`AddNewTask__label ${errors.title && 'AddNewTask__label--err'}`}>
            <input
              type='text'
              {...register('title', {
                validate: (value) => isDuplicatedName(value),
                required: true,
              })}
            />
            {errors.title?.type == 'validate' && <span className='AddNewTask__label--errText'>Used</span>}
            {errors.title?.type == 'required' && <span className='AddNewTask__label--errText'>Required</span>}
          </label>
        </div>
        <div className='AddNewTask__boxWrapper'>
          <p className='AddNewTask__sub-title'>Description</p>
          <textarea className='AddNewTask__description' rows={4} {...register('description')} />
        </div>
        <div className='AddNewTask__boxWrapper'>
          <p className='AddNewTask__sub-title'>Subtasks</p>
          <ul className='AddNewTask__subtaskUl'>
            {fields.map((item: ISubTask, index: number) => {
              return (
                <li className='AddNewTask__subtaskLi' key={index}>
                  <label className={`AddNewTask__label ${errors.subtasks?.[index]?.title && 'AddNewTask__label--err'}`}>
                    <input
                      className='AddNewTask__subtask-input'
                      type='text'
                      defaultValue={`${item.title}`}
                      {...register(`subtasks.${index}.title`, {
                        required: true,
                      })}
                    />
                    {errors.subtasks?.[index]?.title?.type == 'required' && (
                      <span className='AddNewTask__label--errText'>Required</span>
                    )}
                  </label>
                  <button type='button' className='' onClick={() => remove(index)}>
                    <Cross />
                  </button>
                </li>
              );
            })}
          </ul>
          {fields.length < 7 && (
            <Button small colorTheme onClick={handleAddNewSubTask} style={{ marginTop: '0.5rem' }}>
              + Add New Subtask
            </Button>
          )}
        </div>
        <div className='AddNewTask__boxWrapper AddNewTask__status'>
          <p className='AddNewTask__sub-title'>Status</p>
          <SelectDropDown
            status={boardStatus}
            currentStatus={status ? status : boardStatus[0]}
            onSetCurrentStatus={onSetCurrentStatus}
          />
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

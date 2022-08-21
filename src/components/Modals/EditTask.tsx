import { SubmitHandler, useForm, useFieldArray } from 'react-hook-form';
import { IModal, ISubTask, ITask } from '../../data/type';
import Modal from '../../standard/Modal';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { editTask } from '../../reducer/dataSlice';
import { Cross } from '../../data/icons';
import Button from '../../standard/Button';
import SelectDropDown from '../../standard/SelectDropDown';
import { closeModal } from '../../reducer/modalSlice';

const EditTask = (props: IModal) => {
  const { ModalDetail, boardTab } = props;
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
      id: ModalDetail.id,
      title: ModalDetail.title,
      description: ModalDetail.description,
      subtasks: ModalDetail.subtasks.map((item: ISubTask) => ({ title: item.title, isCompleted: item.isCompleted })),
      status: ModalDetail.status,
    },
  });
  const status = getValues().status;
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'subtasks',
  });
  const isDuplicatedName = (value = '') => {
    if (!targetBoard?.columns) return;
    if (value.toLowerCase() === ModalDetail.title.toLowerCase()) return true;
    return !targetBoard.columns.find((column) =>
      column.tasks?.find((task) => task.title?.toLowerCase() == value.toLowerCase())
    );
  };

  const onSetCurrentStatus = (value: string) => {
    setValue('status', value, { shouldValidate: true });
  };

  const onSubmit: SubmitHandler<ITask> = (data) => {
    dispatch(editTask({ currentBoardTab: boardTab, newTask: data, oldTask: ModalDetail }));
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
          <h2>Edit Task</h2>
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
            Save Changes
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default EditTask;

import { nanoid } from '@reduxjs/toolkit';
import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form';
import Modal from '../../standard/Modal';
import { IBoard, IColumn, IModal } from '../../data/type';
import { Cross } from '../../data/icons';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { editBoard, setBoardStatus } from '../../reducer/dataSlice';
import Button from '../../standard/Button';
import { setTab } from '../../reducer/boardTabSlice';
import { hasDuplicates } from '../../helper/util';
import { closeModal } from '../../reducer/modalSlice';

const EditBoard = (props: IModal) => {
  const dispatch = useAppDispatch();
  const boardData = useAppSelector((state) => state.data);
  const modalType = useAppSelector((state) => state.modal);
  const boardTab = useAppSelector((state) => state.boardTab);
  const currentBoardData = boardData.data.find((item) => item.name === boardTab);
  //TODO add a error page?
  if (!currentBoardData) return null;

  const {
    register,
    watch,
    // clearErrors,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<IBoard>({
    defaultValues: {
      name: currentBoardData.name,
      columns: currentBoardData.columns?.map((item: IColumn) => ({
        id: item.id,
        name: item.name,
        tasks: item.tasks,
      })),
      id: currentBoardData.id,
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'columns',
  });
  const watchFieldArray = watch('columns');
  const controlledFields = fields.map((field, index) => {
    return {
      ...field,
      ...watchFieldArray?.[index],
    };
  });
  const isAddNewColumnModal = modalType.ModalDetail.type === 'AddNewColumn';

  const isDuplicatedName = (value: string | undefined) => {
    if (currentBoardData?.name == value) return true;
    return !boardData.data.find((item) => item.name?.toLowerCase() == value?.toLowerCase());
  };

  const onSubmit: SubmitHandler<IBoard> = (data) => {
    dispatch(editBoard({ currentBoardTab: boardTab, newBoard: data }));
    dispatch(setBoardStatus(data.name));
    dispatch(setTab(data.name));
    dispatch(closeModal());
  };

  const handleAddNewColumn = () => {
    if (fields.length > 5) return;
    append({ id: nanoid(), name: '', tasks: [] });
  };

  return (
    <Modal {...props}>
      <form className='AddNewTask' onSubmit={handleSubmit(onSubmit)}>
        <div className='AddNewTask__topWrapper'>
          <h2>{isAddNewColumnModal ? 'Add New Column' : 'Edit Board'}</h2>
        </div>
        <div className='AddNewTask__boxWrapper'>
          <p className='AddNewTask__sub-title'>Name</p>
          <label className={`AddNewTask__label ${errors.name && 'AddNewTask__label--err'}`}>
            <input
              defaultValue={currentBoardData.name}
              disabled={isAddNewColumnModal}
              style={isAddNewColumnModal ? { opacity: 0.3 } : {}}
              type='text'
              {...register('name', {
                validate: (value) => isDuplicatedName(value),
                required: true,
              })}
            />
            {errors.name?.type == 'validate' && <span className='AddNewTask__label--errText'>Used</span>}
            {errors.name?.type == 'required' && <span className='AddNewTask__label--errText'>Required</span>}
          </label>
        </div>

        <div className='AddNewTask__boxWrapper'>
          <p className='AddNewTask__sub-title'>Columns</p>
          <ul className='AddNewTask__subtaskUl'>
            {controlledFields.map((item: IColumn, index: number) => {
              return (
                <li className='AddNewTask__subtaskLi' key={item.id}>
                  <label className={`AddNewTask__label ${errors.columns?.[index]?.name && 'AddNewTask__label--err'}`}>
                    <input
                      className='AddNewTask__subtask-input'
                      defaultValue={`${item.name}`}
                      {...register(`columns.${index}.name`, {
                        validate: (value) => hasDuplicates(value, index, watchFieldArray),
                        required: true,
                      })}
                    />
                    {errors.columns?.[index]?.name?.type == 'validate' && (
                      <span className='AddNewTask__label--errText'>Used</span>
                    )}

                    {errors.columns?.[index]?.name?.type == 'required' && (
                      <span className='AddNewTask__label--errText'>Required</span>
                    )}
                  </label>

                  {fields.length > 1 && (
                    <button
                      type='button'
                      style={item.tasks!.length < 1 ? {} : { opacity: '0.2', pointerEvents: 'none' }}
                      onClick={() => remove(index)}
                    >
                      <Cross />
                    </button>
                  )}
                </li>
              );
            })}
          </ul>

          {fields.length < 6 && (
            <Button small colorTheme onClick={handleAddNewColumn} style={{ marginTop: '0.5rem' }}>
              + Add New Column
            </Button>
          )}
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

export default EditBoard;

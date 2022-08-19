import { ChangeEvent, FormEvent, useState } from 'react';
import { nanoid } from '@reduxjs/toolkit';
import { useForm, useFieldArray } from 'react-hook-form';
import Modal from '../../standard/Modal';
import { IModal, IColumn } from '../../data/type';
import { Cross } from '../../data/icons';
import Button from '../../standard/Button';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { addBoard, setBoardStatus } from '../../reducer/dataSlice';
import { closeModal } from '../../reducer/modalSlice';
import { setTab } from '../../reducer/boardTabSlice';
import { hasDuplicates } from '../../helper/util';

const AddBoard = (props: IModal) => {
  const dispatch = useAppDispatch();
  const {
    register,
    watch,
    clearErrors,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      name: '',
      columns: [{ id: nanoid(), name: '', tasks: [] }],
      id: nanoid(),
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
      ...watchFieldArray[index],
    };
  });

  const boardData = useAppSelector((state) => state.data);
  const isDuplicatedName = (value: string) => !boardData.data.find((item) => item.name === value);
  const isDuplicatedColumn = (arr: any, value: string) =>
    !arr.map((item: any) => {
      console.log('---item name:', item.name, '\n ivalue:', value);
      return item.name === value;
    });
  const onSubmit = (data: any) => {
    dispatch(addBoard(data));
    dispatch(setTab(data.name));
    dispatch(setBoardStatus(data.name));
    dispatch(closeModal());
  };

  const handleAddNewColumn = () => {
    if (fields.length > 5) {
      return;
    }
    append({ id: nanoid(), name: '', tasks: [] });
  };

  return (
    <Modal {...props}>
      <form className='AddNewTask' onSubmit={handleSubmit(onSubmit)}>
        <div className='AddNewTask__topWrapper'>
          <h2>Add New Board</h2>
        </div>
        <div className='AddNewTask__boxWrapper'>
          <p className='AddNewTask__sub-title'>Name</p>
          <label className={`AddNewTask__label ${errors.name && 'AddNewTask__label--err'}`}>
            <input
              type='text'
              {...register('name', { validate: (value) => isDuplicatedName(value), required: true })}
            />
            {errors.name && <span className='AddNewTask__label--errText'>Invalid</span>}
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
                        validate: () => hasDuplicates(index, watchFieldArray),
                        required: 'required',
                      })}
                      onClick={() => clearErrors(['columns'])}
                    />
                    {errors.columns?.[index]?.name?.type == 'validate' && (
                      <span className='AddNewTask__label--errText'>Check all duplicates</span>
                    )}

                    {errors.columns?.[index]?.name?.type == 'required' && (
                      <span className='AddNewTask__label--errText'>{errors.columns?.[index]?.name?.message}</span>
                    )}
                  </label>

                  <button type='button' className='' onClick={() => remove(index)}>
                    <Cross />
                  </button>
                </li>
              );
            })}
          </ul>
          {fields.length <= 5 && (
            <Button small colorTheme onClick={handleAddNewColumn} style={{ marginTop: '0.5rem' }}>
              + Add New Column
            </Button>
          )}
        </div>

        <div className='AddNewTask__boxWrapper'>
          <Button small type='submit'>
            Create New Board
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddBoard;

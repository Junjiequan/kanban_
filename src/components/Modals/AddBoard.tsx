import { ChangeEvent, FormEvent, useState } from 'react';
import Modal from '../../standard/Modal';
import { IModal, IColumn } from '../../data/type';
import { Cross } from '../../data/icons';
import Button from '../../standard/Button';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { addBoard, setBoardStatus } from '../../reducer/dataSlice';
import { closeModal } from '../../reducer/modalSlice';
import { setTab } from '../../reducer/boardTabSlice';

const AddBoard = (props: IModal) => {
  const dispatch = useAppDispatch();
  const boardData = useAppSelector((state) => state.data);
  const [newBoard, setNewBoard] = useState({
    name: '',
    columns: [{ name: '', tasks: [] }],
  });

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    const isDuplicated = boardData.data.find((item) => item.name === newBoard.name);
    if (!newBoard.name || isDuplicated) {
      alert('check form - empty name or duplicated name');
      return;
    }
    dispatch(addBoard(newBoard));
    dispatch(setTab(newBoard.name));
    dispatch(setBoardStatus(newBoard.name));
    dispatch(closeModal());
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewBoard({ ...newBoard, name: e.target.value });
  };

  const onColumnsChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const columns = newBoard.columns.slice();
    columns[index] = { ...columns[index], name: e.target.value };
    setNewBoard({ ...newBoard, columns: columns });
  };

  const handleAddNewColumn = () => {
    const columns = newBoard.columns.slice();
    if (columns.length > 5) {
      alert('too many columns');
      return;
    }
    columns.push({ name: '', tasks: [] });
    setNewBoard({ ...newBoard, columns: columns });
  };
  const handleDeleteColumn = (index: number) => {
    const columns = newBoard.columns.slice();
    columns.splice(index, 1);
    setNewBoard({ ...newBoard, columns: columns });
  };

  return (
    <Modal {...props}>
      <form className='AddNewTask' onSubmit={handleFormSubmit}>
        <div className='AddNewTask__topWrapper'>
          <h2>Add New Board</h2>
        </div>
        <div className='AddNewTask__boxWrapper'>
          <p className='AddNewTask__sub-title'>Name</p>
          <input type='text' value={newBoard.name} name='title' onChange={handleInputChange} />
        </div>

        <div className='AddNewTask__boxWrapper'>
          <p className='AddNewTask__sub-title'>Columns</p>
          <ul className='AddNewTask__subtaskUl'>
            {newBoard.columns.map((item: IColumn, index: number) => {
              return (
                <li className='AddNewTask__subtaskLi' key={index}>
                  <input
                    className='AddNewTask__subtask__input'
                    type='text'
                    value={item.name}
                    onChange={(e) => onColumnsChange(e, index)}
                  />
                  <button type='button' className='' onClick={() => handleDeleteColumn(index)}>
                    <Cross />
                  </button>
                </li>
              );
            })}
          </ul>
          <Button small colorTheme onClick={handleAddNewColumn} style={{ marginTop: '0.5rem' }}>
            + Add New Column
          </Button>
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

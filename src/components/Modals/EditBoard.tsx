import { ChangeEvent, FormEvent, useState } from 'react';
import Modal from '../../standard/Modal';
import { IColumn, IModal } from '../../data/type';
import { Cross } from '../../data/icons';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { editBoard, setBoardStatus } from '../../reducer/dataSlice';
import Button from '../../standard/Button';
import { setTab } from '../../reducer/boardTabSlice';

const EditBoard = (props: IModal) => {
  const dispatch = useAppDispatch();
  const boardData = useAppSelector((state) => state.data);
  const modalType = useAppSelector((state) => state.modal);
  const boardTab = useAppSelector((state) => state.boardTab);
  const currentBoardData = boardData.data.find((item) => item.name === boardTab);
  const [newBoard, setNewBoard] = useState({
    name: currentBoardData?.name || '',
    columns: currentBoardData?.columns?.map((item: IColumn) => ({ name: item.name, tasks: item.tasks })) || [
      { name: '', tasks: [] },
    ],
  });

  const isAddNewColumnModal = modalType.ModalDetail.type === 'AddNewColumn';

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    //TODO check duplication
    const isDuplicated = boardData.data.find((item) => item.name === newBoard.name);
    if ((!newBoard.name || isDuplicated) && !isAddNewColumnModal && newBoard.name !== currentBoardData!.name) {
      alert('check form - empty name or duplicated name');
      return;
    }

    dispatch(editBoard({ currentBoardTab: boardTab, newBoard: newBoard }));
    dispatch(setBoardStatus(newBoard.name));
    dispatch(setTab(newBoard.name));
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
          <h2>{isAddNewColumnModal ? 'Add New Column' : 'Edit Board'}</h2>
        </div>
        <div className='AddNewTask__boxWrapper'>
          <p className='AddNewTask__sub-title'>Name</p>
          <input
            type='text'
            value={newBoard.name}
            name='title'
            onChange={handleInputChange}
            disabled={isAddNewColumnModal}
            style={isAddNewColumnModal ? { opacity: 0.3 } : {}}
          />
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
                    required
                  />
                  {item.tasks!.length < 1 && (
                    <button type='button' className='' onClick={() => handleDeleteColumn(index)}>
                      <Cross />
                    </button>
                  )}
                </li>
              );
            })}
          </ul>

          {newBoard.columns.length < 6 && (
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

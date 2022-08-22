import Button from '../../standard/Button';
import { openModal } from '../../reducer/modalSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import DropDown from '../../standard/DropDown';

const Launch = () => {
  const dispatch = useAppDispatch();
  const board = useAppSelector((state) => state.data.data);
  const boardTab = useAppSelector((state) => state.boardTab);
  const hasBoard = board ? board.length > 0 : false;

  return (
    <div className='Launch'>
      <h1 className='Launch__title'>{boardTab}</h1>
      {hasBoard && (
        <div className='Launch__buttons'>
          <Button onClick={() => dispatch(openModal({ ModalType: 'AddNewTask' }))}> + Add New task </Button>
          <DropDown
            text={'Board'}
            onEdit={() => dispatch(openModal({ ModalType: 'EditBoard', ModalDetail: { type: 'EditBoard' } }))}
            onDelete={() => dispatch(openModal({ ModalType: 'DeleteBoard' }))}
          />
        </div>
      )}
    </div>
  );
};

export default Launch;

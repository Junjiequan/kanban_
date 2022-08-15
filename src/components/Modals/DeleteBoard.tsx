import { IModal } from '../../data/type';
import { useAppDispatch } from '../../hooks/useRedux';
import { deleteBoard } from '../../reducer/dataSlice';
import { closeModal } from '../../reducer/modalSlice';
import Button from '../../standard/Button';
import Modal from '../../standard/Modal';

const DeleteBoard = (props: IModal) => {
  const { boardTab } = props;
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    dispatch(deleteBoard(boardTab));
    dispatch(closeModal());
  };

  const handleCancel = () => {
    dispatch(closeModal());
  };

  return (
    <Modal>
      <div className='DeleteBoard'>
        <div className='DeleteBoard__topWrapper'>
          <h2 className='DeleteBoard__text-title'>Delete this board?</h2>
          <p className='DeleteBoard__text-info'>
            Are you sure you want to delete the &apos;{boardTab}&apos; board? This action will remove all columns and
            tasks and cannot be reversed.
          </p>
        </div>
        <div className='DeleteBoard__btnWrapper'>
          <Button small className='DeleteBoard__btn--delete' onClick={handleDelete}>
            Delete
          </Button>
          <Button small className='DeleteBoard__btn--cancel' onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteBoard;

import { IModal } from '../../data/type';
import { useAppDispatch } from '../../hooks/useRedux';
import { deleteTask } from '../../reducer/dataSlice';
import { closeModal } from '../../reducer/modalSlice';
import Button from '../../standard/Button';
import Modal from '../../standard/Modal';

const DeleteTask = (props: IModal) => {
  const { boardTab, ModalDetail } = props;

  const dispatch = useAppDispatch();
  const handleDelete = () => {
    dispatch(deleteTask({ currentBoardTab: boardTab, task: ModalDetail }));
    dispatch(closeModal());
  };

  const handleCancel = () => {
    dispatch(closeModal());
  };

  return (
    <Modal>
      <div className='DeleteBoard'>
        <div className='DeleteBoard__topWrapper'>
          <h2 className='DeleteBoard__text-title'>Delete this task?</h2>
          <p className='DeleteBoard__text-info'>
            Are you sure you want to delete the &apos;{ModalDetail.title}&apos; board? This action will remove all
            columns and tasks and cannot be reversed.
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

export default DeleteTask;

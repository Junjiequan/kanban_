import Modal from '../../standard/Modal';
import { IModal } from '../../data/type';
import DropDown from '../../standard/DropDown';
import { openModal } from '../../reducer/modalSlice';
import { useAppDispatch } from '../../hooks/useRedux';
import CheckBox from '../../standard/CheckBox';

const ViewTask = (props: IModal) => {
  const { ModalDetail } = props;
  const dispatch = useAppDispatch();
  const countCompleted = ModalDetail.subtasks?.filter((item: any) => item.isCompleted === true);
  if (!Object.keys(ModalDetail).length) return null;
  return (
    <Modal>
      <div className='ViewTask'>
        <div className='ViewTask__top'>
          <p className='ViewTask__title'>{ModalDetail.title} </p>
          <DropDown
            text='task'
            onEdit={() => dispatch(openModal({ ModalType: 'EditTask' }))}
            onDelete={() => dispatch(openModal({ ModalType: 'DeleteTask' }))}
          />
        </div>
        <p className='ViewTask__desc'>{ModalDetail.description ? ModalDetail.description : 'No description'}</p>
        <p className='ViewTask__subtasks'>
          Subtasks ({countCompleted?.length} of {ModalDetail.subtasks?.length})
        </p>
        <div className='ViewTasks__checkBox-container'>
          {ModalDetail.subtasks.map((i: any, index: number) => (
            <CheckBox key={index} task={i.title} />
          ))}
        </div>
        <div>
          Current Status <br /> {ModalDetail.status}
        </div>
      </div>
    </Modal>
  );
};

export default ViewTask;

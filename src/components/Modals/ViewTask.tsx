import { useState } from 'react';
import Modal from '../../standard/Modal';
import { IModal } from '../../data/type';
import DropDown from '../../standard/DropDown';
import { openModal } from '../../reducer/modalSlice';
import { useAppDispatch } from '../../hooks/useRedux';
import CheckBox from '../../standard/CheckBox';
import SelectDropDown from '../../standard/SelectDropDown';

const ViewTask = (props: IModal) => {
  const { ModalDetail } = props;
  const status = ['todo', 'doing', 'done'];
  const [currentStatus, setCurrentStatus] = useState(status[0]);
  const dispatch = useAppDispatch();
  const countCompleted = ModalDetail.subtasks?.filter((item: any) => item.isCompleted === true);
  const onSetCurrentStatus = (value: string) => {
    setCurrentStatus(value);
  };
  if (!Object.keys(ModalDetail).length) return null;
  return (
    <Modal>
      <div className='ViewTask'>
        <div className='ViewTask__topWrapper'>
          <h2>{ModalDetail.title} </h2>
          <DropDown
            text='task'
            onEdit={() => dispatch(openModal({ ModalType: 'EditTask' }))}
            onDelete={() => dispatch(openModal({ ModalType: 'DeleteTask' }))}
            direction={'right'}
          />
        </div>
        <p className='ViewTask__descWrapper'>{ModalDetail.description ? ModalDetail.description : 'No description'}</p>

        <div className='ViewTask__subtaskWrapper'>
          <p className='ViewTask__sub-title'>
            Subtasks ({countCompleted?.length} of {ModalDetail.subtasks?.length})
          </p>
          {ModalDetail.subtasks.map((i: any, index: number) => (
            <CheckBox key={index} task={i.title} />
          ))}
        </div>
        <div className='ViewTask__statusWrapper'>
          <p className='ViewTask__sub-title'>Current Status</p>
          <div className='ViewTask__status-dropdown'>
            <SelectDropDown status={status} currentStatus={currentStatus} onSetCurrentStatus={onSetCurrentStatus} />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ViewTask;

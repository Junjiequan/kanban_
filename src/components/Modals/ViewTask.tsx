import { useEffect, useState } from 'react';
import Modal from '../../standard/Modal';
import { IModal, ISubTask } from '../../data/type';
import DropDown from '../../standard/DropDown';
import { openModal } from '../../reducer/modalSlice';
import { editTask } from '../../reducer/dataSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import CheckBox from '../../standard/CheckBox';
import SelectDropDown from '../../standard/SelectDropDown';

const ViewTask = (props: IModal) => {
  const { ModalDetail, boardTab } = props;
  const dispatch = useAppDispatch();
  const [newTask, setNewTask] = useState({
    title: ModalDetail.title,
    description: ModalDetail.description,
    subtasks: ModalDetail.subtasks.map((item: ISubTask) => ({ title: item.title, isCompleted: item.isCompleted })),
    status: ModalDetail.status,
  });

  const boardData = useAppSelector((state) => state.data);
  const boardStatus = boardData.currentBoardStatus;

  //TODO high priority - fix a way to refresh old task always

  const countCompleted = ModalDetail.subtasks?.filter((item: ISubTask) => item.isCompleted === true);

  const onSetCurrentStatus = (value: string) => {
    //TODO change modal status  - add it with drag and drop
    setNewTask({ ...newTask, status: value });
    dispatch(openModal({ ModalType: 'ViewTask', ModalDetail: newTask }));
  };

  useEffect(() => {
    dispatch(editTask({ currentBoard: boardTab, newTask: newTask, oldTask: ModalDetail }));
  }, [newTask.status]);

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
          {ModalDetail.subtasks.length === 0 && <p className='ViewTask__noSubTask'>No subtasks.</p>}
          {ModalDetail.subtasks.map((i: ISubTask, index: number) => (
            <CheckBox key={index} task={i.title} />
          ))}
        </div>
        <div className='ViewTask__statusWrapper'>
          <p className='ViewTask__sub-title'>Current Status</p>
          <div className='ViewTask__status-dropdown'>
            <SelectDropDown
              status={boardStatus}
              currentStatus={newTask.status ? newTask.status : boardStatus[0]}
              onSetCurrentStatus={onSetCurrentStatus}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ViewTask;

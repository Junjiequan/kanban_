import { useAppDispatch } from '../../hooks/useRedux';
import { openModal } from '../../reducer/modalSlice';
import type { ITask } from '../../data/type';
import type { DraggableProvided } from '@hello-pangea/dnd';

interface CardProps {
  cardData: ITask;
  provided: DraggableProvided;
}

const Card = (props: CardProps) => {
  const dispatch = useAppDispatch();
  const { cardData, provided } = props;

  const countCompleted = cardData.subtasks?.filter((item) => item.isCompleted === true);

  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className='Card'
      onClick={() => dispatch(openModal({ ModalType: 'ViewTask', ModalDetail: cardData }))}
    >
      <div className='Card__title'>{cardData.title}</div>
      <div className='Card__count'>
        {countCompleted?.length} of {cardData.subtasks?.length} subtasks
      </div>
    </div>
  );
};

export default Card;

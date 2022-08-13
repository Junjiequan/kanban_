import type { ITask } from '../../data/type';
import { useAppDispatch } from '../../hooks/useRedux';
import { openModal } from '../../reducer/modalSlice';

interface CardProps {
  cardData: ITask;
}

const Card = (props: CardProps) => {
  const dispatch = useAppDispatch();
  const { cardData } = props;

  const countCompleted = cardData.subtasks?.filter((item) => item.isCompleted === true);

  return (
    <button className='Card' onClick={() => dispatch(openModal({ ModalType: 'ViewTask', ModalDetail: cardData }))}>
      <div className='Card__title'>{cardData.title}</div>
      <div className='Card__count'>
        {countCompleted?.length} of {cardData.subtasks?.length} subtasks
      </div>
    </button>
  );
};

export default Card;

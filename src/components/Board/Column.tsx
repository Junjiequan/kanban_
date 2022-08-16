import React from 'react';
import Card from './Card';
import type { IColumn } from '../../data/type';
import { openModal } from '../../reducer/modalSlice';
import { useAppDispatch } from '../../hooks/useRedux';
import { Droppable } from 'react-beautiful-dnd';

interface ColumnProps {
  columnData: IColumn | undefined;
  ballColor: number;
}

const Column = (props: ColumnProps) => {
  const { columnData, ballColor } = props;
  const dispatch = useAppDispatch();

  if (!columnData) {
    return (
      <div className='Column'>
        <div className='Column__title'>&nbsp;</div>
        <button
          className='Column__addNewButton'
          onClick={() => dispatch(openModal({ ModalType: 'EditBoard', ModalDetail: { type: 'AddNewColumn' } }))}
        >
          + New Column
        </button>
      </div>
    );
  }
  return (
    <div className='Column'>
      <div className='Column__title'>
        <span className={`Column__title-ball Column__title-ball--${ballColor}`}></span>
        <span className='Column__title-text' title={columnData.name}>
          {columnData.name}({columnData.tasks?.length})
        </span>
      </div>
      {/* <Droppable droppableId={null}> */}
      <div className={`Column__container ${columnData.tasks?.length ? '' : 'Column__container--empty'}`}>
        {columnData.tasks?.map((cardData, index) => {
          return <Card key={index} cardData={cardData} />;
        })}
      </div>
      {/* </Droppable> */}
    </div>
  );
};

export default Column;

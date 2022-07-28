import React from 'react';
import Card from './Card';
import type { IColumn } from '../../data/type';

interface ColumnProps {
  columnData: IColumn | undefined;
  ballColor: number;
}

const Column = (props: ColumnProps) => {
  const { columnData, ballColor } = props;

  if (!columnData) {
    return (
      <div className='Column'>
        <div className='Column__title'>&nbsp;</div>
        <button className='Column__addNewButton' onClick={() => console.log('clicked')}>
          + New Column
        </button>
      </div>
    );
  }
  return (
    <div className='Column'>
      <div className='Column__title'>
        <span className={`Column__title-ball Column__title-ball--${ballColor}`}></span>
        {columnData.name}({columnData.tasks?.length})
      </div>
      <div className={`Column__container ${columnData.tasks?.length ? '' : 'Column__container--empty'}`}>
        {columnData.tasks?.map((cardData) => {
          return <Card key={cardData.title} cardData={cardData} />;
        })}
      </div>
    </div>
  );
};

export default Column;

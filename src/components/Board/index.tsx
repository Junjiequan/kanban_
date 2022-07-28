import React from 'react';
import { useAppSelector } from '../../hooks/useRedux';
import Column from './Column';
import type { IColumn } from '../../data/type';

const Board = (props: any) => {
  const { hideSideNav } = props;
  const data = useAppSelector((state) => state.data.data);

  const onHide = hideSideNav ? 'Board__full' : '';

  return (
    <div className={`Board ${onHide}`}>
      {data.columns?.map((columnData: IColumn, index: number) => (
        <Column key={index} data={columnData} />
      ))}
    </div>
  );
};

export default Board;

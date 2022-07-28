import React from 'react';
import { useAppSelector } from '../../hooks/useRedux';
import Column from './Column';
import type { IColumn } from '../../data/type';

const Board = (props: any) => {
  const { hideSideNav } = props;
  const board = useAppSelector((state) => state.data.data);
  const currentTab = useAppSelector((state) => state.boardTab);
  const onHide = hideSideNav ? 'Board__full' : '';

  const data = currentTab ? board.find((item) => item.name === currentTab) : board[0];
  const columnsCount: number = data?.columns ? data?.columns?.length : 0;

  return (
    <div className={`Board ${onHide}`}>
      {data?.columns?.map((columnData: IColumn, index: number) => (
        <Column key={index} columnData={columnData} ballColor={index} />
      ))}

      {columnsCount < 4 && <Column ballColor={3} columnData={undefined} />}
    </div>
  );
};

export default Board;

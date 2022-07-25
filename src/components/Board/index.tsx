import React from 'react';
import Column from './Column';

const Board = (props: any) => {
  const { hideSideNav } = props;
  const onHide = hideSideNav ? 'Board__full' : '';
  return (
    <div className={`Board ${onHide}`}>
      <Column />
      <Column />
      <Column />
      <Column />
    </div>
  );
};

export default Board;

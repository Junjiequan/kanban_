import React from 'react';
import { type ITab } from '../../data/type';
import { IconBoard } from '../../data/icons';

const Tab = (props: ITab) => {
  const { tab, addNew } = props;
  const active = tab === 'Roadmap';

  if (addNew) {
    return (
      <button className='SideNav__tab SideNav__tab--addNew'>
        <IconBoard />+ Create New Board
      </button>
    );
  }
  return (
    <button className={`SideNav__tab ${active ? 'SideNav__tab--active' : ''}`}>
      <IconBoard />
      {tab}
    </button>
  );
};

export default Tab;

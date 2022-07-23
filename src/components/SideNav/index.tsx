import React from 'react';

import Tab from './Tab';

const SideNav = ({ themeChange }: any) => {
  const fakeData: string[] = ['Platform Launch', 'Marketing Plan', 'Roadmap'];
  return (
    <div className='SideNav'>
      <div className='SideNav__top'>
        <div className='SideNav__head'>ALL BOARDS {fakeData.length}</div>

        <div>
          {fakeData.map((tab, index) => (
            <Tab key={index} tab={tab} />
          ))}
        </div>
        <Tab addNew />
      </div>
      <div className='SideNav__bottom'>
        <button onClick={themeChange}>aa</button>
      </div>
    </div>
  );
};

export default SideNav;

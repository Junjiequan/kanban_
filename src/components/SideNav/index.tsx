import React, { useState } from 'react';
import { type IThemeChange } from '../../data/type';
import { IconHide, IconMoon, IconSun } from '../../data/icons';

import Tab from './Tab';

const SideNav = ({ themeChange }: IThemeChange) => {
  const [toggled, setToggled] = useState<boolean>(false);
  const fakeData: string[] = ['Platform Launch', 'Marketing Plan', 'Roadmap'];

  const handleOnClick = () => {
    themeChange();
    setToggled((prev) => !prev);
  };
  return (
    <div className='SideNav'>
      <div className='SideNav__top'>
        <div className='SideNav__head'>ALL BOARDS ({fakeData.length})</div>

        <div>
          {fakeData.map((tab, index) => (
            <Tab key={index} tab={tab} />
          ))}
        </div>
        <Tab addNew />
      </div>
      <div className='SideNav__bottom'>
        <div className='SideNav__theme-mode'>
          <IconSun />
          <button className='SideNav__theme-toggle' onClick={handleOnClick}>
            <span className='SideNav__theme-toggle--ball' style={toggled ? { left: '55%' } : { left: '10%' }}></span>
          </button>
          <IconMoon />
        </div>
        <button className='SideNav__hide'>
          <IconHide />
          Hide Sidebar
        </button>
      </div>
    </div>
  );
};

export default SideNav;

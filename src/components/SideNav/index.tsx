import React, { useState } from 'react';
import { type IThemeChange } from '../../data/type';
import useMediaQuery from '../../hooks/useMediaQuery';
import { IconHide, IconMoon, IconSun } from '../../data/icons';

import Tab from './Tab';

const SideNav = (props: any) => {
  const { themeChange, hideSideNav, toggleOnHide } = props;
  const [toggled, setToggled] = useState<boolean>(false);

  const mobileQuery = useMediaQuery('(max-width: 480px)');

  const fakeData: string[] = ['Platform Launch', 'Marketing Plan', 'Roadmap'];

  const handleThemeToggle = () => {
    themeChange();
    setToggled((prev) => !prev);
  };

  const isMobile = mobileQuery ? 'SideNav__isMobile' : '';
  const onHide = hideSideNav ? 'SideNav__hide' : '';
  return (
    <div className={`SideNav ${isMobile} ${onHide}`}>
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
          <button className='SideNav__theme-toggle' onClick={handleThemeToggle}>
            <span className='SideNav__theme-toggle--ball' style={toggled ? { left: '55%' } : { left: '10%' }}></span>
          </button>
          <IconMoon />
        </div>
        <button className='SideNav__hideButton' onClick={toggleOnHide}>
          <IconHide />
          Hide Sidebar
        </button>
      </div>
    </div>
  );
};

export default SideNav;

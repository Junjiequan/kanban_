import { useState } from 'react';
import { IconHide, IconMoon, IconSun } from '../../data/icons';

import Tab from './Tab';
import { useAppSelector } from '../../hooks/useRedux';

interface SideNavProps {
  themeChange: () => void;
  toggleOnHide?: () => void;
  hideSideNav?: boolean;
  setToggleNav?: React.Dispatch<React.SetStateAction<boolean>>;
}

const SideNav = (props: SideNavProps) => {
  const { themeChange, hideSideNav, toggleOnHide, setToggleNav } = props;
  const colorTheme = useAppSelector((state) => state.data.colorTheme);
  const [toggled, setToggled] = useState<boolean>(colorTheme === 'light');

  const board = useAppSelector((state) => state.data.data);

  const handleThemeToggle = () => {
    themeChange();
    setToggled((prev) => !prev);
  };

  const onHide = hideSideNav && toggleOnHide ? 'SideNav__hide' : '';

  return (
    <div className={`SideNav ${onHide}`}>
      <div className='SideNav__top'>
        <div className='SideNav__head'>ALL BOARDS ({board ? board.length : 0})</div>

        <div>
          {board.map((tab, index) => {
            return <Tab key={index} tab={tab.name} defaultTab={index === 0} setToggleNav={setToggleNav} />;
          })}
        </div>
        <Tab addNew setToggleNav={setToggleNav} />
      </div>
      <div className='SideNav__bottom'>
        <div className='SideNav__theme-mode'>
          <IconSun />
          <button className='SideNav__theme-toggle' onClick={handleThemeToggle}>
            <span className='SideNav__theme-toggle--ball' style={toggled ? { left: '55%' } : { left: '10%' }}></span>
          </button>
          <IconMoon />
        </div>

        {!hideSideNav && (
          <button className='SideNav__hideButton' onClick={toggleOnHide}>
            <IconHide />
            Hide Sidebar
          </button>
        )}
      </div>
    </div>
  );
};

export default SideNav;

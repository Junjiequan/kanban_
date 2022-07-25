import { useState } from 'react';
import Board from '../../components/Board';
import SideNav from '../../components/SideNav';
import { IconShow } from '../../data/icons';
import { type IThemeChange } from '../../data/type';

const Main = (props: IThemeChange) => {
  const { themeChange } = props;
  const [hideSideNav, setHideSideNav] = useState<boolean>(false);

  const toggleOnHide = () => {
    setHideSideNav((prev) => !prev);
  };

  return (
    <div className='Main'>
      <SideNav themeChange={themeChange} toggleOnHide={toggleOnHide} hideSideNav={hideSideNav} />
      <Board hideSideNav={hideSideNav} />
      {hideSideNav && (
        <button className='Main__showSideNavButton' onClick={toggleOnHide}>
          <IconShow />
        </button>
      )}
    </div>
  );
};

export default Main;

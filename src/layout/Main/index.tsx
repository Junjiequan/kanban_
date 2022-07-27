import { useState } from 'react';
import Board from '../../components/Board';
import SideNav from '../../components/SideNav';
import ScrollContainer from 'react-indiana-drag-scroll';
import { IconShow } from '../../data/icons';
import { type IThemeChange } from '../../data/type';

const Main = (props: IThemeChange) => {
  const { themeChange } = props;
  const [hideSideNav, setHideSideNav] = useState<boolean>(false);

  const toggleOnHide = () => {
    setHideSideNav((prev) => !prev);
  };

  return (
    <ScrollContainer className='Main' vertical={false} hideScrollbars={false} ignoreElements={'.Card'}>
      <SideNav themeChange={themeChange} toggleOnHide={toggleOnHide} hideSideNav={hideSideNav} />
      <Board hideSideNav={hideSideNav} />
      {hideSideNav && (
        <button className='Main__showSideNavButton' onClick={toggleOnHide}>
          <IconShow />
        </button>
      )}
    </ScrollContainer>
  );
};

export default Main;

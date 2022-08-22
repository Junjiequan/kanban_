import { useState } from 'react';
import Board from '../../components/Board';
import SideNav from '../../components/SideNav';
import ScrollContainer from 'react-indiana-drag-scroll';
import { IconShow } from '../../data/icons';
import { useAppSelector } from '../../hooks/useRedux';
import useMediaQuery from '../../hooks/useMediaQuery';

interface MainProps {
  themeChange: () => void;
}

const Main = (props: MainProps) => {
  const { themeChange } = props;
  const [hideSideNav, setHideSideNav] = useState<boolean>(false);
  const data = useAppSelector((state) => state.data.data);
  const currentTab = useAppSelector((state) => state.boardTab);
  const currentBoard = data?.find((item) => item.name === currentTab);
  const mobileQuery = useMediaQuery('mobile');
  const toggleOnHide = () => {
    setHideSideNav((prev) => !prev);
  };

  return (
    <ScrollContainer
      className='Main'
      nativeMobileScroll={true}
      vertical={false}
      hideScrollbars={false}
      ignoreElements={'.Card'}
    >
      {!mobileQuery && <SideNav themeChange={themeChange} toggleOnHide={toggleOnHide} hideSideNav={hideSideNav} />}
      <Board hideSideNav={hideSideNav} allBoards={data} board={currentBoard} currentTab={currentTab} />
      {hideSideNav && (
        <button className='Main__showSideNavButton' onClick={toggleOnHide}>
          <IconShow />
        </button>
      )}
    </ScrollContainer>
  );
};

export default Main;

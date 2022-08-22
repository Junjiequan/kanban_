import { useState, MouseEvent } from 'react';
import Button from '../../standard/Button';
import { openModal } from '../../reducer/modalSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import DropDown from '../../standard/DropDown';
import useMediaQuery from '../../hooks/useMediaQuery';
import { ChevronDown, IconPlus } from '../../data/icons';
import SideNav from '../SideNav';
import { toggleTheme } from '../../reducer/dataSlice';

const Launch = () => {
  const dispatch = useAppDispatch();
  const [toggleNav, setToggleNav] = useState(false);
  const board = useAppSelector((state) => state.data.data);
  const boardTab = useAppSelector((state) => state.boardTab);
  const hasBoard = board ? board.length > 0 : false;
  const mobileQuery = useMediaQuery('mobile');

  const colorTheme = useAppSelector((state) => state.data.colorTheme);
  const handleColorTheme = () => {
    return colorTheme === 'dark' ? dispatch(toggleTheme('light')) : dispatch(toggleTheme('dark'));
  };

  const handleToggleNav = () => {
    setToggleNav((prev) => !prev);
  };

  const handleClickOverlay = (e: MouseEvent) => {
    const target = e.target as Element;
    if (target.className === 'Launch__mobile-sideNav') {
      setToggleNav(false);
    }
  };

  return (
    <div className='Launch'>
      {toggleNav && mobileQuery && (
        <div className='Launch__mobile-sideNav' onClick={(e) => handleClickOverlay(e)}>
          <SideNav themeChange={handleColorTheme} setToggleNav={setToggleNav} />
        </div>
      )}

      {mobileQuery ? (
        <button className='Launch__mobile-btn' onClick={handleToggleNav}>
          <span className='Launch__mobile-btn-title'>{boardTab}</span>
          <span className='Launch__mobile-btn-icon' style={toggleNav ? { transform: 'rotate(180deg)' } : {}}>
            <ChevronDown />
          </span>
        </button>
      ) : (
        <h1 className='Launch__title' title={boardTab}>
          {boardTab}
        </h1>
      )}

      {hasBoard && (
        <div className='Launch__buttons'>
          {mobileQuery ? (
            <Button small onClick={() => dispatch(openModal({ ModalType: 'AddNewTask' }))}>
              <IconPlus />
            </Button>
          ) : (
            <Button onClick={() => dispatch(openModal({ ModalType: 'AddNewTask' }))}>
              &nbsp; + Add New task &nbsp;
            </Button>
          )}

          <DropDown
            text={'Board'}
            onEdit={() => dispatch(openModal({ ModalType: 'EditBoard', ModalDetail: { type: 'EditBoard' } }))}
            onDelete={() => dispatch(openModal({ ModalType: 'DeleteBoard' }))}
          />
        </div>
      )}
    </div>
  );
};

export default Launch;

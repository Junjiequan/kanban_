import { useState, useRef } from 'react';
import useOnClickOutside from '../hooks/useOnClickOutside';
import { ChevronDown } from '../data/icons';

const SelectDropDown = (props: { status: string[] }) => {
  const { status } = props;
  const [openDropDown, setOpenDropDown] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(status[0]);
  const selectDropDownRef = useRef(null);

  const DropDownItem = (props: { item: string }) => {
    return (
      <button className='SelectDropDown__btn' onClick={() => handleSetCurrentStatus(props.item)}>
        {props.item}
      </button>
    );
  };

  const handleOpenDropDown = () => {
    setOpenDropDown((prev) => !prev);
  };

  const handleSetCurrentStatus = (status: string) => {
    setOpenDropDown(false);
    setCurrentStatus(status);
  };

  const handleClickOutside = () => {
    setOpenDropDown(false);
  };

  useOnClickOutside(selectDropDownRef, handleClickOutside);

  return (
    <div className='SelectDropDown' ref={selectDropDownRef}>
      <button className='SelectDropDown__trigger' onClick={handleOpenDropDown}>
        {currentStatus}
        <span className='SelectDropDown__trigger-icon' style={openDropDown ? { transform: 'rotate(180deg)' } : {}}>
          <ChevronDown />
        </span>
      </button>
      {openDropDown && (
        <div className='SelectDropDown__wrapper'>
          {status.map((item: string) => (
            <DropDownItem key={item} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectDropDown;

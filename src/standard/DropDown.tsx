import React, { Dispatch, SetStateAction, useRef } from 'react';
import useOnClickOutside from '../hooks/useOnClickOutside';

interface DropDownProps {
  text: string;
  setOpenDropDown: Dispatch<SetStateAction<boolean>>;
  onEdit: () => void;
  onDelete: () => void;
}

const DropDown = (props: DropDownProps) => {
  const dropDownRef = useRef(null);
  const { text, setOpenDropDown, onEdit, onDelete } = props;

  const handleClickOutside = (e: MouseEvent) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: Object is possibly 'null'
    const isToggleButton = e.target.attributes['data-dropdown-toggle'];
    //click dropdown toggle button do nothing
    if (isToggleButton) return;

    setOpenDropDown(false);
  };

  const handleOnEdit = () => {
    onEdit();
    setOpenDropDown(false);
  };

  const handleOnDelete = () => {
    setOpenDropDown(false);
    onDelete();
  };

  useOnClickOutside(dropDownRef, handleClickOutside);

  return (
    <div ref={dropDownRef} className='DropDown'>
      <button className='DropDown__text' onClick={handleOnEdit}>
        Edit {text}
      </button>
      <button className='DropDown__text DropDown__text--warning' onClick={handleOnDelete}>
        Delete {text}
      </button>
    </div>
  );
};

export default DropDown;

import { useState, useRef } from 'react';
import useOnClickOutside from '../hooks/useOnClickOutside';
import { IconEllipsis } from '../data/icons';

type direciton = 'right' | undefined;

interface DropDownProps {
  text: string;
  onEdit: () => void;
  onDelete: () => void;
  direction?: direciton;
}

const DropDown = (props: DropDownProps) => {
  const { text, onEdit, onDelete, direction } = props;
  const [openDronDown, setOpenDropDown] = useState(false);
  const dropDownRef = useRef(null);
  const BoxDirection = direction ? `DropDown__wrapper--${direction}` : '';

  const handleClickOutside = () => {
    setOpenDropDown(false);
  };

  const handleOnEdit = () => {
    setOpenDropDown(false);
    onEdit();
  };

  const handleOnDelete = () => {
    setOpenDropDown(false);
    onDelete();
  };

  useOnClickOutside(dropDownRef, handleClickOutside);

  return (
    <div className='DropDown' ref={dropDownRef}>
      <button
        type='button'
        tabIndex={0}
        className='DropDown__button-ellipsis'
        onClick={() => setOpenDropDown((prev) => !prev)}
      >
        <IconEllipsis />
      </button>
      {openDronDown && (
        <div className={`DropDown__wrapper ${BoxDirection}`}>
          <button type='button' className='DropDown__text' onClick={handleOnEdit}>
            Edit {text}
          </button>
          <button type='button' className='DropDown__text DropDown__text--warning' onClick={handleOnDelete}>
            Delete {text}
          </button>
        </div>
      )}
    </div>
  );
};

export default DropDown;

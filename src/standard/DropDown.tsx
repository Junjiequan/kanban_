import { useState, useRef } from 'react';
import useOnClickOutside from '../hooks/useOnClickOutside';
import { IconEllipsis } from '../data/icons';

interface DropDownProps {
  text: string;
  onEdit: () => void;
  onDelete: () => void;
}

const DropDown = (props: DropDownProps) => {
  const { text, onEdit, onDelete } = props;
  const [openDronDown, setOpenDropDown] = useState(false);
  const dropDownRef = useRef(null);

  const handleClickOutside = () => {
    setOpenDropDown(false);
  };

  const handleOnEdit = () => {
    onEdit();
  };

  const handleOnDelete = () => {
    onDelete();
  };

  useOnClickOutside(dropDownRef, handleClickOutside);

  return (
    <div ref={dropDownRef} className='DropDown__button-ellipsis' onClick={() => setOpenDropDown((prev) => !prev)}>
      <IconEllipsis />
      {openDronDown && (
        <div className='DropDown'>
          <button className='DropDown__text' onClick={handleOnEdit}>
            Edit {text}
          </button>
          <button className='DropDown__text DropDown__text--warning' onClick={handleOnDelete}>
            Delete {text}
          </button>
        </div>
      )}
    </div>
  );
};

export default DropDown;

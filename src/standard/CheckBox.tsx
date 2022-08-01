import { useState } from 'react';

const CheckBox = (props: any) => {
  const { index, task } = props;
  const [checked, setChecked] = useState(false);
  const handleCheck = () => {
    setChecked((prev) => !prev);
  };
  return (
    <label className='CheckBox' key={index}>
      <input type='checkbox' checked={checked} onChange={handleCheck} />
      {task}
    </label>
  );
};

export default CheckBox;

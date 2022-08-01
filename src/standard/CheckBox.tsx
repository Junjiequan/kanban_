import { useState } from 'react';

interface CheckBoxProps {
  task: string;
}

const CheckBox = (props: CheckBoxProps) => {
  const { task } = props;
  const [checked, setChecked] = useState(false);
  const handleCheck = () => {
    setChecked((prev) => !prev);
  };
  return (
    <label className={`CheckBox ${checked ? 'CheckBox--checked' : ''}`}>
      <input type='checkbox' checked={checked} onChange={handleCheck} />
      {task}
    </label>
  );
};

export default CheckBox;

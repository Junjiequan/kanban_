interface CheckBoxProps {
  task: string;
  checked: boolean;
  index: number;
  onChangeSubtaskCheck: (index: number) => void;
}

const CheckBox = (props: CheckBoxProps) => {
  const { task, checked, onChangeSubtaskCheck, index } = props;

  return (
    <label className={`CheckBox ${checked ? 'CheckBox--checked' : ''}`}>
      <input type='checkbox' checked={checked} onChange={() => onChangeSubtaskCheck(index)} />
      {task}
    </label>
  );
};

export default CheckBox;

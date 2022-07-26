import React from 'react';
import Button from '../../standard/Button';
import { IconEllipsis } from '../../data/icons';

const Launch = (props: any) => {
  const { setModal } = props;
  return (
    <div className='Launch'>
      <h1 className='Launch__title'>Platform Launch</h1>
      <div className='Launch__buttons'>
        <Button onClick={() => setModal({ ViewTask: true })}> + Add New task</Button>
        <button className='Launch__button-ellipsis' onClick={() => setModal({ AddBoard: true })}>
          <IconEllipsis />
        </button>
      </div>
    </div>
  );
};

export default Launch;

import React from 'react';
import Button from '../../standard/Button';
import { IconEllipsis } from '../../data/icons';

const Launch = () => {
  return (
    <div className='Launch'>
      <h1 className='Launch__title'>Platform Launch</h1>
      <div className='Launch__buttons'>
        <Button onClick={() => console.log('yes')}> + Add New task</Button>
        <button className='Launch__button-ellipsis' onClick={() => console.log('ellipsis')}>
          <IconEllipsis />
        </button>
      </div>
    </div>
  );
};

export default Launch;

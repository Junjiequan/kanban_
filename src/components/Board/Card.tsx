import React from 'react';

const Card = (props: any) => {
  return (
    <div className='Card' tabIndex={0}>
      <div className='Card__title'>This is the part of title</div>
      <div className='Card__count'>0 of 6 subtasks</div>
    </div>
  );
};

export default Card;

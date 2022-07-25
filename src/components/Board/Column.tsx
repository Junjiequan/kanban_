import React from 'react';
import Card from './Card';
const Column = (props: any) => {
  return (
    <div className='Column'>
      <div className='Column__title'>
        <span className={`Column__title-ball Column__title-ball--${0}`}></span>Todo(4)
      </div>
      <div className='Column__container'>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
};

export default Column;

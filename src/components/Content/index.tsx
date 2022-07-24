import React from 'react';

const Content = (props: any) => {
  const { hideSideNav } = props;
  const onHide = hideSideNav ? 'Content__full' : '';
  return (
    <div className={`Content ${onHide}`}>
      <div className='Content__column'>asdsadsa</div>
      <div className='Content__column'>asdsadsa</div>
      <div className='Content__column'>asdsadsa</div>
    </div>
  );
};

export default Content;

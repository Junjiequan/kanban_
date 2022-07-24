import React from 'react';

const Content = (props: any) => {
  const { hideSideNav } = props;
  const onHide = hideSideNav ? 'Content__full' : '';
  return <div className={`Content ${onHide}`}>Content</div>;
};

export default Content;

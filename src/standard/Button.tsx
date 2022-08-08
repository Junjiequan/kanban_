import React from 'react';

const Button = (props: any) => {
  return (
    <button
      type={props.type ? props.type : 'button'}
      className={`Button ${props.small ? 'Button--small' : ''} ${props.colorTheme ? 'Button--theme' : ''}`}
      style={props.style}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;

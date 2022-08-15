import React from 'react';

interface ButtonProps {
  type?: 'button' | 'reset' | 'submit';
  small?: boolean;
  colorTheme?: boolean;
  style?: React.CSSProperties;
  className?: string;
  onClick?: () => void;
  children: JSX.Element | string;
}

const Button = (props: ButtonProps) => {
  return (
    <button
      type={props.type ? props.type : 'button'}
      className={`Button  ${props.small ? 'Button--small' : ''} ${props.colorTheme ? 'Button--theme' : ''} ${
        props.className ? props.className + ' Button--custom' : ''
      } `}
      style={props.style}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;

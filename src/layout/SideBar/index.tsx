import React from 'react';
import LogoDark from '../../assets/logo-dark.svg';
import LogoLight from '../../assets/logo-light.svg';
import LogoMobile from '../../assets/logo-mobile.svg';
import SideNav from '../../components/SideNav';

const SideBar = (props: any) => {
  const { themeChange, colorTheme } = props;

  const LogoImg = colorTheme === 'dark' ? LogoLight : LogoDark;

  return (
    <div className='SideBar'>
      <picture className='SideBar__Logo'>
        <source srcSet={LogoMobile} media='(max-width: 480px)' />
        <img src={LogoImg} />
      </picture>
      <SideNav themeChange={themeChange} />
    </div>
  );
};

export default SideBar;

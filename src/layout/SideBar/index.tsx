import React from 'react';
import LogoDark from '../../assets/logo-dark.svg';
import LogoLight from '../../assets/logo-light.svg';
import LogoMobile from '../../assets/logo-mobile.svg';
import SideNav from '../../components/SideNav';

const SideBar = ({ themeChange }: any) => {
  const colorTheme = true;
  const LogoImg = colorTheme ? LogoDark : LogoLight;

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

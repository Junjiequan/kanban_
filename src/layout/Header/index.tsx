import Launch from '../../components/Launch';
import LogoDark from '../../assets/logo-dark.svg';
import LogoLight from '../../assets/logo-light.svg';
import LogoMobile from '../../assets/logo-mobile.svg';

interface HeaderProps {
  colorTheme: string;
}

const Header = (props: HeaderProps) => {
  const { colorTheme } = props;

  const LogoImg = colorTheme === 'dark' ? LogoLight : LogoDark;

  return (
    <div className='Header'>
      <picture className='Header__Logo'>
        <source srcSet={LogoMobile} media='(max-width: 767px)' />
        <img src={LogoImg} />
      </picture>
      <Launch />
    </div>
  );
};

export default Header;

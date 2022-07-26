import Launch from '../../components/Launch';
import LogoDark from '../../assets/logo-dark.svg';
import LogoLight from '../../assets/logo-light.svg';
import LogoMobile from '../../assets/logo-mobile.svg';

const Header = (props: any) => {
  const { colorTheme, setModal } = props;

  const LogoImg = colorTheme === 'dark' ? LogoLight : LogoDark;

  return (
    <div className='Header'>
      <picture className='Header__Logo'>
        <source srcSet={LogoMobile} media='(max-width: 480px)' />
        <img src={LogoImg} />
      </picture>
      <Launch setModal={setModal} />
    </div>
  );
};

export default Header;

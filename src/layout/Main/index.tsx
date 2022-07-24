import SideNav from '../../components/SideNav';
import { type IThemeChange } from '../../data/type';

const Main = (props: IThemeChange) => {
  const { themeChange } = props;

  return (
    <div className='Main'>
      <SideNav themeChange={themeChange} />
    </div>
  );
};

export default Main;

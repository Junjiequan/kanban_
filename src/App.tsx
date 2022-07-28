import { useState, useEffect } from 'react';
import Header from './layout/Header';
import Main from './layout/Main';
import Modals from './components/Modals';
import { type IModal } from './data/type';
import './App.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getLocalData } from './reducer/dataSlice';
import { AppDispatch, RootState } from './store';

const App = () => {
  const [modal, setModal] = useState<IModal>({});
  const data = useSelector((state: RootState) => state.data.data);
  const dispatch: any = useDispatch<AppDispatch>();
  const [colorTheme, setColorTheme] = useState('dark');
  const handleColorTheme = () => {
    return colorTheme === 'dark' ? setColorTheme('light') : setColorTheme('dark');
  };
  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setModal({});
    }
  };
  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await import('./data/data.json');
        const data: any = response.boards[0];
        dispatch(getLocalData(data));
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className={`App ${colorTheme}`}>
      <Header themeChange={handleColorTheme} colorTheme={colorTheme} setModal={setModal} />
      <Main themeChange={handleColorTheme} />
      <Modals modal={modal} setModal={setModal} />
    </div>
  );
};

export default App;

import { useState, useEffect } from 'react';
import Header from './layout/Header';
import Main from './layout/Main';
import Modals from './components/Modals';
import { getLocalData } from './reducer/dataSlice';
import { closeModal } from './reducer/modalSlice';
import { useAppDispatch } from './hooks/useRedux';
import './App.scss';

const App = () => {
  const dispatch = useAppDispatch();
  const [colorTheme, setColorTheme] = useState('dark');
  const handleColorTheme = () => {
    return colorTheme === 'dark' ? setColorTheme('light') : setColorTheme('dark');
  };
  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      dispatch(closeModal);
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
        const data = response.boards;
        dispatch(getLocalData(data));
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className={`App ${colorTheme}`}>
      <Header colorTheme={colorTheme} />
      <Main themeChange={handleColorTheme} />
      <Modals />
    </div>
  );
};

export default App;

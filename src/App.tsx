import { useEffect } from 'react';
import Header from './layout/Header';
import Main from './layout/Main';
import Modals from './components/Modals';
import { getLocalData, setBoardStatus } from './reducer/dataSlice';
import { closeModal } from './reducer/modalSlice';
import { toggleTheme } from './reducer/dataSlice';
import { useAppDispatch, useAppSelector } from './hooks/useRedux';
import { setTab } from './reducer/boardTabSlice';
import './App.scss';

const App = () => {
  const dispatch = useAppDispatch();
  const colorTheme = useAppSelector((state) => state.data.colorTheme);
  const handleColorTheme = () => {
    return colorTheme === 'dark' ? dispatch(toggleTheme('light')) : dispatch(toggleTheme('dark'));
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

        if (data[0]) {
          dispatch(setTab(data[0]?.name));
          dispatch(setBoardStatus(data[0]?.name));
        }
      } catch (err) {
        console.error(err);
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

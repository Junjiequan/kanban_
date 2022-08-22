import { useEffect } from 'react';
import Header from './layout/Header';
import Main from './layout/Main';
import Modals from './components/Modals';
import { getLocalData, hydrate, setBoardStatus } from './reducer/dataSlice';
import { closeModal, openModal } from './reducer/modalSlice';
import { toggleTheme } from './reducer/dataSlice';
import { useAppDispatch, useAppSelector } from './hooks/useRedux';
import { setTab } from './reducer/boardTabSlice';
import './App.scss';
import { loadState, store } from './store';

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
    const persistedState = loadState();
    const fetchData = async () => {
      try {
        const response = await import('./data/data.json');
        const data = response.boards;
        dispatch(getLocalData(data));
        dispatch(setTab(data[0].name));
        dispatch(setBoardStatus(data[0].name));
      } catch (err) {
        console.error(err);
      }
    };
    if (persistedState) {
      store.dispatch(hydrate(persistedState.data));
    }
    if (persistedState && persistedState.data.data.length === 0) {
      fetchData();
    }
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

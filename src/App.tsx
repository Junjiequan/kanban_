import { useState, useEffect } from 'react';
import Header from './layout/Header';
import Main from './layout/Main';
import boardData from './data/data.json';
import Modals from './components/Modals';
import { type IModal } from './data/type';
import './App.scss';

const App = () => {
  const [data, setData] = useState(boardData.boards);
  const [modal, setModal] = useState<IModal>({});
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

  // const getData = () => {
  //   fetch('url', {
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Accept: 'application/json',
  //     },
  //   })
  //     .then((response) => {
  //       console.log(response);
  //       return response.json();
  //     })
  //     .then((myJson) => {
  //       console.log(myJson);
  //       setData(myJson);
  //     });
  // };
  // useEffect(() => {
  //   getData();
  // }, []);
  return (
    <div className={`App ${colorTheme}`}>
      <Header themeChange={handleColorTheme} colorTheme={colorTheme} setModal={setModal} />
      <Main themeChange={handleColorTheme} />
      <Modals modal={modal} setModal={setModal} />
    </div>
  );
};

export default App;

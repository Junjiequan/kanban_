import { useState } from 'react';
import SideBar from './layout/SideBar';
import Board from './layout/Board';
import './App.scss';

const App = () => {
  const [colorTheme, setColorTheme] = useState('dark');
  const handleColorTheme = () => {
    return colorTheme === 'dark' ? setColorTheme('light') : setColorTheme('dark');
  };

  return (
    <div className={`App ${colorTheme}`}>
      <SideBar themeChange={handleColorTheme} colorTheme={colorTheme} />
      <Board />
    </div>
  );
};

export default App;

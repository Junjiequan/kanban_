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
      {/* <button onClick={handleColorTheme}>He</button> */}
      <SideBar themeChange={handleColorTheme} />
      <Board />
    </div>
  );
};

export default App;

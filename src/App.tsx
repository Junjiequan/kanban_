import { useState } from 'react';
import Header from './layout/Header';
import Main from './layout/Main';
import './App.scss';

const App = () => {
  const [colorTheme, setColorTheme] = useState('dark');
  const handleColorTheme = () => {
    return colorTheme === 'dark' ? setColorTheme('light') : setColorTheme('dark');
  };

  return (
    <div className={`App ${colorTheme}`}>
      <Header themeChange={handleColorTheme} colorTheme={colorTheme} />
      <Main themeChange={handleColorTheme} />
    </div>
  );
};

export default App;

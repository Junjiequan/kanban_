import { useState } from 'react';
import './App.scss';

const App = () => {
  const [colorTheme, setColorTheme] = useState('light');
  const handleColorTheme = () => {
    return colorTheme === 'light' ? setColorTheme('dark') : setColorTheme('light');
  };
  return (
    <div className='App' data-theme={colorTheme}>
      <button className='' onClick={handleColorTheme}>
        {'NAH,....NOT TODAY '}
        Click to change color
      </button>
      <div className=''>Hello</div>
    </div>
  );
};

export default App;

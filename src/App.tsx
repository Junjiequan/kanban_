import { useState } from 'react';
import './App.scss';

const App = () => {
  const [colorTheme, setColorTheme] = useState('light');
  const handleColorTheme = () => {
    return colorTheme === 'light' ? setColorTheme('dark') : setColorTheme('light');
  };
  return (
    <div className='App' data-theme={colorTheme}>
      <button onClick={handleColorTheme}> Click to change color</button>
      <div>Hello</div>
    </div>
  );
};

export default App;

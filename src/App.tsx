import { useState } from 'react';
import './App.scss';

const App = () => {
  const [colorTheme, setColorTheme] = useState('light');
  const handleColorTheme = () => {
    return colorTheme === 'light' ? setColorTheme('dark') : setColorTheme('light');
  };
  return (
    <div className='App ' data-theme={colorTheme}>
      <button
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'
        onClick={handleColorTheme}
      >
        {'NAH,....NOT TODAY '}
        Click to change color
      </button>
      <div className='text-blue-900'>Hello</div>
    </div>
  );
};

export default App;

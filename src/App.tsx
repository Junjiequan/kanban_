import { useState } from 'react';
import './App.scss';

const App = () => {
  const [colorTheme, setColorTheme] = useState('light');
  const handleColorTheme = () => {
    return colorTheme === 'light' ? setColorTheme('dark') : setColorTheme('light');
  };

  const value = ['one', 'two', 'three'];

  // const test = value.reduce((acc, v) => {
  //   return Object.assign(acc, { [v]: v });
  // }, {});

  const newMap = new Map();
  for (let i = 0; i < value.length; i++) {
    newMap.set(`${i}:${value[i]}`, value[i]);
  }

  console.log(Object.fromEntries(newMap));

  return (
    <div className='App' data-theme={colorTheme}>
      <button className='' onClick={handleColorTheme}>
        {'NAH,....NOT TODAY '}
        Click to change color.
      </button>
      <div className=''>Hello</div>
    </div>
  );
};

export default App;

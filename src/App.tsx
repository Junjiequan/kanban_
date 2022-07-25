import { useState, useEffect } from 'react';
import Header from './layout/Header';
import Main from './layout/Main';
import boardData from './data/data.json';
import './App.scss';

const App = () => {
  const [data, setData] = useState(boardData.boards);

  const [colorTheme, setColorTheme] = useState('dark');
  const handleColorTheme = () => {
    return colorTheme === 'dark' ? setColorTheme('light') : setColorTheme('dark');
  };
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
      <Header themeChange={handleColorTheme} colorTheme={colorTheme} />
      <Main themeChange={handleColorTheme} />
    </div>
  );
};

export default App;

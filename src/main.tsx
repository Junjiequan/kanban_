import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { saveState, store } from './store';
import { Provider } from 'react-redux';
import './styles/index.scss';
import { throttle } from 'lodash';

store.subscribe(
  throttle(() => {
    saveState(store.getState());
  }, 1000)
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

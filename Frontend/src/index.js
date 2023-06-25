import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import store from './store';

import './bootstrap.min.css';
import './index.css';

const root = document.getElementById('root');
ReactDOM.createRoot(root).render(
  <Provider store={store}>
     <App />
  </Provider>
);


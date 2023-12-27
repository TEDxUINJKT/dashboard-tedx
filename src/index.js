import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRouter from './router';

import { Provider } from 'react-redux';
import { store } from './state/store';

import 'ldrs/ring'
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/global.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AppRouter />
    </Provider>
  </React.StrictMode>
);


import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';

import reportWebVitals from './reportWebVitals';

import { AuthProvider } from './context/auth';
import { LayoutProvider } from "./context/LayoutContext";

ReactDOM.render(
  <React.StrictMode>
    <LayoutProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </LayoutProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();

import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';

import App from './App';
import './index.scss';

import { AuthProvider } from './context/auth';
import { MediaProvider } from './context/media';
import { LayoutProvider } from "./context/LayoutContext";

ReactDOM.render(
  <React.StrictMode>
    <LayoutProvider>
      <AuthProvider>
        <MediaProvider>
          <App />
        </MediaProvider>
      </AuthProvider>
    </LayoutProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();

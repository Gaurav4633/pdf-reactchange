import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { FileProvider } from './context/FileContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <FileProvider>
        <App />
      </FileProvider>
    </BrowserRouter>
  </React.StrictMode>,
);

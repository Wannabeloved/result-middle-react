import React from 'react';
import ReactDOM from 'react-dom/client';
import { rootStore, StoreContext } from './store/RootStore';
import { MainApp } from './apps/MainApp/MainApp';
import reportWebVitals from './reportWebVitals';
import './index.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <StoreContext.Provider value={rootStore}>
      <MainApp />
    </StoreContext.Provider>
  </React.StrictMode>
);

reportWebVitals();

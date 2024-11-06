import React from 'react';
import ReactDOM from 'react-dom/client';
import "base/style.scss"
import App from "components/App/App";
import { ProductProvider } from './context/ProductContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ProductProvider>
      <App />
    </ProductProvider>
  </React.StrictMode>
);
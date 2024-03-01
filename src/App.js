// src/App.js
import React from 'react';
import './App.css'; // Assume basic styles are defined here
import ProductList from './components/ProductList';

const App = () => {
  return (
    <div className="app">
      <h1>Product Catalog</h1>
      <ProductList />
    </div>
  );
};

export default App;

// src/components/ProductItem.js
import React from 'react';

const ProductItem = ({ product }) => (
  <div className="product-item">
    <h3>{product.product}</h3>
    <p>Price: ${product.price}</p>
    <p>Brand: {product.brand || 'N/A'}</p>
  </div>
);

export default ProductItem;

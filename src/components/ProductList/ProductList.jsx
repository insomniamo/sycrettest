import React, { useContext } from "react";

import "./productlist.scss"
import { ProductContext } from "../../context/ProductContext";

function ProductList({ products = [], onBuy }) {
  const { selectedProduct, setSelectedProduct } = useContext(ProductContext);

  const handleSelectChange = (event) => {
    const selectedId = event.target.value;
    const product = products.find(p => p.ID === selectedId);
    setSelectedProduct(product);
  };

  return (
    <div className="products">
      <h1>Выберите товар</h1>
      <select className="products__select" onChange={handleSelectChange} value={selectedProduct ? selectedProduct.ID : ""}>
        <option value="" disabled>Выберите товар</option>
        {Array.isArray(products) && products.map(product => (
          <option key={product.ID} value={product.ID}>
            {product.NAME} - {product.SUMMA} руб.
          </option>
        ))}
      </select>
      <button className="products__button" onClick={onBuy} disabled={!selectedProduct}>
        Купить
      </button>
    </div>
  );
}

export default ProductList;

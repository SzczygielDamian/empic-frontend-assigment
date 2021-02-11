import React from "react";


const QuantityOfProducts = ({ product, quantityProduct, addProduct, removeProduct }) => {
  const { pid, price, min, max, isBlocked } = product;

  return (
    <div>
      <button disabled={isBlocked} onClick={() => removeProduct(pid, price)}>-</button>
      <button
        disabled={isBlocked}
        onClick={() => addProduct(pid, quantityProduct)}
      >
        +
      </button>
      <p>Obecnie masz {quantityProduct} sztuk produktu</p>
    </div>
  );
};

export default QuantityOfProducts;

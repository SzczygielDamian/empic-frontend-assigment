import * as React from 'react';

import "./QuantityOfProducts.css";

function polishPlural(
  singularNominativ: any,
  pluralNominativ: any,
  pluralGenitive: any,
  value: any
) {
  if (value === 1) {
    return singularNominativ;
  } else if (
    value % 10 >= 2 &&
    value % 10 <= 4 &&
    (value % 100 < 10 || value % 100 >= 20)
  ) {
    return pluralNominativ;
  } else {
    return pluralGenitive;
  }
}

export interface QuantityOfProductsProps {
  product: any,
  quantityProduct: any,
  changeTheQuantityProduct: any,
}
 
const QuantityOfProducts: React.FC<QuantityOfProductsProps> = ({
  product: { pid, isBlocked },
  quantityProduct,
  changeTheQuantityProduct,
}) => (
  <div className="quantity-products-container">
    <p>
      Obecnie masz {quantityProduct}
      {polishPlural("sztukę", "sztuki", "sztuk", quantityProduct)} produktu
    </p>
    <button
      className="quantity-button"
      disabled={isBlocked}
      onClick={() => changeTheQuantityProduct(pid, "remove")}
    >
      -
    </button>
    <button
      className="quantity-button"
      disabled={isBlocked}
      onClick={() => changeTheQuantityProduct(pid, "add")}
    >
      +
    </button>
  </div>
);

export default QuantityOfProducts;

import * as React from 'react';
import { polishPlural } from '../App/helpers/polishPlural';

import "./QuantityOfProducts.css";

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

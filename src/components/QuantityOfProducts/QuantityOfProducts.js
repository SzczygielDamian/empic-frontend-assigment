import React from "react";

function polishPlural(
  singularNominativ,
  pluralNominativ,
  pluralGenitive,
  value
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

const QuantityOfProducts = ({
  product,
  quantityProduct,
  changeTheQuantityProduct,
}) => {
  const { pid, min, max, isBlocked } = product;

  return (
    <div className="quantity-products-container">
      <p>
        Obecnie masz {quantityProduct}{" "}
        {polishPlural("sztukę", "sztuki", "sztuk", quantityProduct)} produktu
      </p>
      <button disabled={isBlocked} onClick={() => changeTheQuantityProduct(pid, "remove")}>
        -
      </button>
      <button disabled={isBlocked} onClick={() => changeTheQuantityProduct(pid, "add")}>
        +
      </button>
    </div>
  );
};

export default QuantityOfProducts;

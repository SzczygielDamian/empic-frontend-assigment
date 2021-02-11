import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

import QuantityOfProducts from "../QuantityOfProducts/QuantityOfProducts";

const App = () => {
  const [cart, setCart] = useState({});
  const totalPrice = Object.values(cart).reduce(
    (acc, curr) => acc + curr.quantity * curr.price,
    0
  );

  const getDate = () => {
    axios
      .get("http://localhost:3030/api/cart")
      .then((data) => {
        const cart = data.data.reduce(
          (acc, curr) => ({
            ...acc,
            [curr.pid]: { ...curr, quantity: curr.min },
          }),
          {}
        );
        console.log(cart);
        setCart(cart);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  useEffect(() => {
    getDate();
  }, []);

  const handleAddProduct = (pid) => {
    const updateQuantity = {
      ...cart,
      [pid]: { ...cart[pid], quantity: cart[pid].quantity + 1 },
    };
    setCart(updateQuantity);
  };

  const handleRemoveProduct = (pid) => {
    const quantity = { [pid]: quantityProducts[pid] - 1 };
    const updateQuantity = { ...quantityProducts, ...quantity };
    setQuantityProducts(updateQuantity);
  };

  const productsCart = Object.values(cart).map((product, index) => {
    return (
      <li className="row" key={product.pid}>
        {product.name}, cena: {parseFloat(product.price)} zł{" "}
        <QuantityOfProducts
          product={product}
          quantityProduct={product.quantity}
          addProduct={handleAddProduct}
          removeProduct={handleRemoveProduct}
        />
      </li>
    );
  });

  return (
    <div className="container">
      <h3>Lista produktów</h3>
      <ul>
        {productsCart}
        <p>Całkowita suma zamówienia: {totalPrice}</p>
      </ul>
    </div>
  );
};

export { App };

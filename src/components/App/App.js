import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

import QuantityOfProducts from "../QuantityOfProducts/QuantityOfProducts";

let updateQuantity;

const productCheck = (product, action, changeQuqntityCallback) => {
    axios.post("http://localhost:3030/api/product/check", product)
    .then((res) => {
      changeQuqntityCallback(product.pid, action)
    })
    .catch((error) => console.log(error.response.data.message)
    )
}

const App = () => {
  const [cart, setCart] = useState({});
  const totalPrice = Object.values(cart).reduce(
    (acc, curr) => 
      Math.round(
        (acc + curr.quantity * parseFloat(curr.price) + Number.EPSILON) * 100
      ) / 100,
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
        setCart(cart);
      })
      .catch((error) => {
        console.log(error.response.data.message)
      });
  };

  useEffect(() => {
    getDate();
  }, []);

  const handleChangeTheQuantityProduct = (pid, action) => {
     productCheck({pid, quantity: 1}, action, changeQuqntity);
  };

  const changeQuqntity = (pid, action) => {
    action === "add"
    ? (updateQuantity = {
        ...cart,
        [pid]: { ...cart[pid], quantity: cart[pid].quantity + 1 },
      })
    : (updateQuantity = {
        ...cart,
        [pid]: { ...cart[pid], quantity: cart[pid].quantity - 1 },
      });

      setCart(updateQuantity);
  }

  const productsCart = Object.values(cart).map((product) => {
    return (
      <li className="row" key={product.pid}>
        {product.name}, cena: {parseFloat(product.price)} zł{" "}
        <QuantityOfProducts
          product={product}
          quantityProduct={product.quantity}
          changeTheQuantityProduct={handleChangeTheQuantityProduct}
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

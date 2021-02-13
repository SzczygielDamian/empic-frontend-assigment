import React, { useEffect, useState, useMemo } from "react";

import axios from "axios";
import { debounce } from "lodash";

import QuantityOfProducts from "../QuantityOfProducts/QuantityOfProducts";

import "./App.css";

const getUpdateQuantity = (quantity, action) =>
  quantity + (action === "add" ? +1 : -1);

const productCheck = (
  product,
  action,
  changeQuqntityCallback,
  resetToMinQuantityCallback
) => {
  axios
    .post("http://localhost:3030/api/product/check", product)
    .then((res) => {
      changeQuqntityCallback(product.pid, action);
    })
    .catch((error) => {
      alert(error.response.data.message);
      resetToMinQuantityCallback(product.pid);
    });
};

const App = () => {
  const [cart, setCart] = useState({});
  const totalPrice = useMemo(
    () =>
      Object.values(cart).reduce(
        (acc, curr) =>
          Math.round(
            (acc + curr.quantity * parseFloat(curr.price) + Number.EPSILON) *
              100
          ) / 100,
        0
      ),
    [cart]
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
        console.log(error.response.data.message);
      });
  };

  useEffect(() => {
    getDate();

    return () => handleChangeTheQuantityProduct.cancel();
  }, []);

  const handleChangeTheQuantityProduct = debounce((pid, action) => {
    const checkedProduct = {
      pid,
      quantity: getUpdateQuantity(cart[pid].quantity, action),
    };

    productCheck(checkedProduct, action, changeQuqntity, resetToMinQuantity);
  }, 500);

  const changeQuqntity = (pid, action) => {
    const updateQuantity = {
      ...cart,
      [pid]: {
        ...cart[pid],
        quantity: getUpdateQuantity(cart[pid].quantity, action),
      },
    };

    setCart(updateQuantity);
  };

  const resetToMinQuantity = (pid) => {
    const resetQuantity = {
      ...cart,
      [pid]: { ...cart[pid], quantity: cart[pid].min },
    };

    setCart(resetQuantity);
  };

  const productsCart = Object.values(cart).map((product) => {
    return (
      <li className="row" key={product.pid}>
        <p>
          {product.name}, cena: {parseFloat(product.price)} zł{" "}
        </p>
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

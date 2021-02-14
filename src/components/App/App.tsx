
import React, { useEffect, useMemo, useState } from "react";
import axios from "../../../node_modules/axios/index";

import * as _ from 'lodash';

import QuantityOfProducts from "../QuantityOfProducts/QuantityOfProducts";

import "./App.css";

import { ICart } from "../../shared/interface/cart.interface";
import { IProductsCart } from "../../shared/interface/productCart.interface";
import { getUpdatedQuantity } from "./helpers/getUpdatedQuantity";


const productCheck = (
  product: any,
  action: any,
  changeQuantityCallback: any,
  resetToMinQuantityCallback: any
) => {
  axios
    .post("http://localhost:3030/api/product/check", product)
    .then((res: any) => {
      changeQuantityCallback(product.pid, action);
    })
    .catch((error: any) => {
      alert(error.response.data.message);
      resetToMinQuantityCallback(product.pid);
    });
};

export interface AppProps {
}
 
const App: React.FC<AppProps> = () => {

  const [cart, setCart] = useState<IProductsCart>({});
  const totalPrice = useMemo(
    () =>
      Object.values(cart).reduce(
        (acc: any, curr: any) =>
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
      .then((data: any) => {
        const cart = data.data.reduce(
          (acc: any, curr: any) => ({
            ...acc,
            [curr.pid]: { ...curr, quantity: curr.min },
          }),
          {}
        );
        setCart(cart);
      })
      .catch((error: any) => {
        console.log(error.response.data.message);
      });
  };

  useEffect(() => {
    getDate();

    return () => handleChangeTheQuantityProduct.cancel();
  }, []);

  const handleChangeTheQuantityProduct = _.debounce((pid: string, action: string) => {
    const checkedProduct = {
      pid,
      quantity: getUpdatedQuantity(cart[pid].quantity, action),
    };

    productCheck(checkedProduct, action, changeQuantity, resetToMinQuantity);
  }, 500);

  const changeQuantity = (pid: string, action: string) => {
    const updateQuantity = {
      ...cart,
      [pid]: {
        ...cart[pid],
        quantity: getUpdatedQuantity(cart[pid].quantity, action),
      },
    };

    setCart(updateQuantity);
  };

  const resetToMinQuantity = (pid: string) => {
    const resetQuantity = {
      ...cart,
      [pid]: { ...cart[pid], quantity: cart[pid].min },
    };

    setCart(resetQuantity);
  };

  const productsCart = Object.values(cart).map((product: ICart) => {
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
      {console.log(cart)}
      <ul>
        {productsCart}
        <p>Całkowita suma zamówienia: {totalPrice}</p>
      </ul>
    </div>
  );
};

export { App };

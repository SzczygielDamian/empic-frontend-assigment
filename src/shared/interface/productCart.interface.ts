import { ICart } from "./cart.interface";

export interface IProductsCart {
   [key: string]: ICart,
}
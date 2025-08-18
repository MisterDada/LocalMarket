import { Product } from "./Products";

export interface Cart {
  quantity: number;
  product: Product[];
}

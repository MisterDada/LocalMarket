import { Product } from "./Products";

export interface CreateUserParams {
  name: string;
  password: string;
  role: string;
}

export interface User {
  _id: string;
  product: Product;
}

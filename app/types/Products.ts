export interface Product {
  _id: string;
  name: string;
  description: string;
  price: string;
  image?: { url: string };
}

export interface CreateProductParams {
  name: string;
  description: string;
  price: string;
  category: string;
  file?: string | null;
}

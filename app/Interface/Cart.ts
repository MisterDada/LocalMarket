export interface Cart {
  quantity: number;
  _id: string;
  name: string;
  description: string;
  price: string;
  image?: { url: string };
}

export interface User {
  id: string;
  username: string;
  email: string;
  gender: string;
  image: string;
  isAdmin: boolean;
  carts: { product: string, quantity: number }[];
  orders: string[];
}
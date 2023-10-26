export type CartItem = {
  id: number;
  title: string;
  thumbnail: string;
  price: number;
  currency_id?: string;
  quantity: number;
};

export type Product = {
  id: number;
  title: string;
  thumbnail: string;
  price: string;
};

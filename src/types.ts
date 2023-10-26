export type TipodeCategoria = {
  id: string;
  name: string;
};

export type TipodeProduto = {
  productID: string;
  image: string;
  name: string;
  price: number;
};

export type TipodeCartaoProduto = TipodeProduto & { quantity: number };

// Tipo para os produtos retornados pela pesquisa
export type TipodePesquisadeProduto = {
  id: string;
  title: string;
  thumbnail: string;
  price: number;
};

// Defina um tipo que represente as funcionalidades do carrinho de compras
export type LojaCardUtils = {
  getShoppingCartList: () => TipodeCartaoProduto[];
  addCartProduct: (product: TipodeCartaoProduto) => void;
  removeCartProduct: (productID: string) => void;
  incrementCartItem: (productID: string) => void;
  decrementCartItem: (productID: string) => void;
};

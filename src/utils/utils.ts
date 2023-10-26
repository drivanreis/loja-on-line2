export const handleIncreaseToCart = (
  product: any,
) => {
  const carrinhoModificado = product.cart
    .map((item: { id: any; quantity: number; }) => (item
      .id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
  product.setCart(carrinhoModificado);
  localStorage.setItem('cart', JSON.stringify(carrinhoModificado));
};

export const handleDecreaseToCart = (
  product: any,
) => {
  const carrinhoModificado = product.cart
    .map((item: { id: any; quantity: number; }) => (item
      .id === product.id
      && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item));
  product.setCart(carrinhoModificado);
  localStorage.setItem('cart', JSON.stringify(carrinhoModificado));
};

export const handleRemoveToCart = (product: any) => {
  const remove = product.cart.filter((item:
  { id: any; quantity: number; }) => item.id !== product.id);
  product.setCart(remove);
  localStorage.setItem('cart', JSON.stringify(remove));
};

const currencyProduct = (product: any) => {
  return product.cart.find((
    item: { id: any; },
  ) => item.id === product.id);
};

export const handleAddToCart = (
  product: any,
) => {
  const produtoNoCarrinho = currencyProduct(product);

  if (produtoNoCarrinho) {
    handleIncreaseToCart(product);
  } else {
    product.setCart([...product.cart, { ...product, quantity: 1 }]);
  }
};

import { Link } from 'react-router-dom';
import { CartItem } from '../../utils/types';
import {
  handleIncreaseToCart,
  handleDecreaseToCart, handleRemoveToCart,
} from '../../utils/utils';

function ShoppingCart({ cart, setCart }: {
  cart: CartItem[];
  setCart: (cart: CartItem[]) => void;
}) {
  return (
    <div>
      {cart.length === 0 ? (
        <h3 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h3>
      ) : (
        <div>
          {cart.map((product) => (
            <div key={ product.id }>
              <button
                data-testid="remove-product"
                id={ product.id.toString() }
                onClick={ (event) => {
                  const { id } = event.currentTarget;
                  handleRemoveToCart({ id, cart, setCart });
                } }
              >
                X
              </button>
              <p data-testid="shopping-cart-product-name">{product.title}</p>
              <button
                data-testid="product-decrease-quantity"
                id={ product.id.toString() }
                onClick={ (event) => {
                  const { id } = event.currentTarget;
                  handleDecreaseToCart({ id, cart, setCart });
                } }
              >
                -
              </button>
              <p data-testid="shopping-cart-product-quantity">
                Quantidade:
                {' '}
                {product.quantity}
              </p>
              <button
                data-testid="product-increase-quantity"
                onClick={ (event) => {
                  const { id } = event.currentTarget;
                  handleIncreaseToCart({ id, cart, setCart });
                } }
                id={ product.id.toString() }
              >
                +
              </button>
            </div>
          ))}
          <Link to="/checkout">
            <button data-testid="checkout-products">
              Ir para Checkout
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default ShoppingCart;

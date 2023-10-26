import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../../services/api';
import { handleAddToCart } from '../../utils/utils';
import { CartItem, Product } from '../../utils/types';

function ProductDetails({ cart, setCart }: {
  cart: CartItem[];
  setCart: (cart: CartItem[]) => void;
}) {
  const { idProduct } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchdata = async () => {
      const result = await getProductById(idProduct as string);
      setProduct(result);
    };
    fetchdata();
  }, [idProduct]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const { thumbnail, title, price, id } = product;
  return (
    <div>
      <li>
        <h4 data-testid="product-detail-name">{ title }</h4>
        <img
          data-testid="product-detail-image"
          src={ thumbnail }
          alt={ title }
        />
        <p
          data-testid="product-detail-price"
        >
          { `${price}`}
        </p>
      </li>
      <button
        data-testid="shopping-cart-button"
        onClick={ () => navigate('/shoppingcart') }
      >
        Carrinho

      </button>
      <button
        data-testid="product-detail-add-to-cart"
        onClick={ () => handleAddToCart({
          id,
          title,
          thumbnail,
          price,
          cart,
          setCart,
        }) }
      >
        Adicionar ao Carrinho
      </button>
    </div>
  );
}

export default ProductDetails;

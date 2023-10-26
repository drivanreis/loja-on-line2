import { useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getCategories, getProductsFromCategoryAndQuery } from '../../services/api';
import { CartItem } from '../../utils/types';
import { handleAddToCart } from '../../utils/utils';

function Home({ cart, setCart }: {
  cart: CartItem[];
  setCart: (cart: CartItem[]) => void;
}) {
  const [categories, setCategories] = useState([]);
  const [term, setTerm] = useState('');
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchdata = async () => {
      const result = await getCategories();
      setCategories(result);
    };
    fetchdata();
  }, []);

  function handleChange(event:React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    setTerm(value);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fetchSearch = async () => {
      const data:any = await getProductsFromCategoryAndQuery(undefined, term);
      setProducts(data.results);
    };
    fetchSearch();
  }

  function handleChangeRadio(event: React.MouseEvent<HTMLInputElement, MouseEvent>) {
    const { id } = event.currentTarget;
    const fetchSearch = async () => {
      const data:any = await getProductsFromCategoryAndQuery(id);
      setProducts(data.results);
    };
    fetchSearch();
  }

  return (
    <>
      <aside>
        <h4>Categorias:</h4>
        {categories.map(({ id, name }) => (
          <li key={ id }>
            <label data-testid="category" htmlFor={ id }>{name}</label>
            <input
              type="radio"
              id={ id }
              name="category"
              value={ name }
              onClick={ (event) => handleChangeRadio(event) }
            />
          </li>
        ))}
      </aside>
      <div>
        <form onSubmit={ (event) => handleSubmit(event) }>
          <input
            data-testid="query-input"
            type="text"
            id="search"
            name="search"
            value={ term }
            placeholder="Digite o termo de busca"
            onChange={ (event) => handleChange(event) }
          />
          <button
            data-testid="query-button"
            type="submit"
          >
            Buscar

          </button>
        </form>

        <h3
          data-testid="home-initial-message"
        >
          {term.length === 0
          && 'Digite algum termo de pesquisa ou escolha uma categoria.'}

        </h3>
        <button
          data-testid="shopping-cart-button"
          onClick={ () => navigate('/shoppingcart') }
        >
          Carrinho

        </button>

        {products && products.map(({ id, title, thumbnail, price, currency_id }) => (
          <li
            data-testid="product"
            key={ id }
          >
            <Link
              data-testid="product-detail-link"
              to={ `/productDetails/${id}` }
            >
              <h4>{ title }</h4>
              <img src={ thumbnail } alt={ title } />
              <p>{ `${price} - ${currency_id}`}</p>
            </Link>
            <button
              data-testid="product-add-to-cart"
              onClick={ () => handleAddToCart({
                id,
                title,
                thumbnail,
                price,
                currency_id,
                cart,
                setCart,
              }) }
            >
              Adicionar ao Carrinho
            </button>
          </li>
        ))}

      </div>

    </>
  );
}

export default Home;

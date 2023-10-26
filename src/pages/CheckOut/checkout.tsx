import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartItem } from '../../utils/types';

function Checkout({ cart, setCart }:
{ cart: CartItem[]; setCart: (cart: CartItem[]) => void }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cpf: '',
    phone: '',
    cep: '',
    address: '',
    paymentMethod: '',
  });
  const [error, setError] = useState('');

  const [total, setTotal] = useState(0);

  useEffect(() => {
    const newTotal = cart.reduce((totalAmount, item) => {
      return totalAmount + item.price * item.quantity;
    }, 0);

    setTotal(newTotal);
  }, [cart]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name
      || !formData.email
      || !formData.cpf || !formData.phone || !formData.cep || !formData.address
      || !formData.paymentMethod) {
      setError('Campos inválidos');
    } else {
      setError('');
      setCart([]);
      navigate('/');
    }
  };

  return (
    <div>
      <h2>Checkout</h2>
      <form onSubmit={ handleFormSubmit }>

        <input
          type="text"
          placeholder="Nome Completo"
          value={ formData.name }
          onChange={ (e) => setFormData({ ...formData, name: e.target.value }) }
          data-testid="checkout-fullname"
        />
        <input
          type="email"
          placeholder="Email"
          value={ formData.email }
          onChange={ (e) => setFormData({ ...formData, email: e.target.value }) }
          data-testid="checkout-email"
        />
        <input
          type="text"
          placeholder="CPF"
          value={ formData.cpf }
          onChange={ (e) => setFormData({ ...formData, cpf: e.target.value }) }
          data-testid="checkout-cpf"
        />
        <input
          type="text"
          placeholder="Telefone"
          value={ formData.phone }
          onChange={ (e) => setFormData({ ...formData, phone: e.target.value }) }
          data-testid="checkout-phone"
        />
        <input
          type="text"
          placeholder="CEP"
          value={ formData.cep }
          onChange={ (e) => setFormData({ ...formData, cep: e.target.value }) }
          data-testid="checkout-cep"
        />
        <input
          type="text"
          placeholder="Endereço"
          value={ formData.address }
          onChange={ (e) => setFormData({ ...formData, address: e.target.value }) }
          data-testid="checkout-address"
        />

        <div>
          <label htmlFor="boleto">
            <input
              type="radio"
              id="boleto"
              name="paymentMethod"
              value="boleto"
              checked={ formData.paymentMethod === 'boleto' }
              onChange={ () => setFormData({ ...formData, paymentMethod: 'boleto' }) }
              data-testid="ticket-payment"
            />
            Boleto
          </label>
          <label htmlFor="visa">
            <input
              type="radio"
              id="visa"
              name="paymentMethod"
              value="visa"
              checked={ formData.paymentMethod === 'visa' }
              onChange={ () => setFormData({ ...formData, paymentMethod: 'visa' }) }
              data-testid="visa-payment"
            />
            Visa
          </label>
          <label htmlFor="mastercard">
            <input
              type="radio"
              id="mastercard"
              name="paymentMethod"
              value="mastercard"
              checked={ formData.paymentMethod === 'mastercard' }
              onChange={ () => setFormData({ ...formData, paymentMethod: 'mastercard' }) }
              data-testid="master-payment"
            />
            MasterCard
          </label>
          <label htmlFor="elo">
            <input
              type="radio"
              id="elo"
              name="paymentMethod"
              value="elo"
              checked={ formData.paymentMethod === 'elo' }
              onChange={ () => setFormData({ ...formData, paymentMethod: 'elo' }) }
              data-testid="elo-payment"
            />
            Elo
          </label>
        </div>

        <button type="submit" data-testid="checkout-btn">
          Finalizar Compra
        </button>

      </form>
      {error && <span data-testid="error-msg">{error }</span>}
      <h3>Resumo do Carrinho</h3>
      <ul data-testid="checkout-summary">
        {cart.map((item) => (
          <li key={ item.id }>
            <p>
              {item.title}
              {' '}
            </p>

            <p>
              {' '}
              {item.price * item.quantity}
            </p>

          </li>
        ))}
      </ul>
      <p>
        Total:
        {' '}
        {total}
      </p>
    </div>
  );
}

export default Checkout;

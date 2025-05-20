import { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import axios from 'axios';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

function CheckoutForm() {
  const { items, total, removeFromCart } = useContext(CartContext);
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState('');

  const createPayment = async () => {
    const { data } = await axios.post('/api/payments/create-payment', { items });
    setClientSecret(data.clientSecret);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!stripe || !elements) return;
    await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)
      }
    });
    alert('Pago completado con éxito 🎉');
  };

  return (
    <div className="max-w-lg mx-auto mt-12 space-y-6">
      <h2 className="text-2xl font-bold text-center text-indigo-600">Checkout</h2>
      <ul className="space-y-4">
        {items.map(i => (
          <li key={i._id} className="flex items-center justify-between">
            <div>
              <span className="font-medium">{i.name}</span> x{i.qty}
            </div>
            <div className="flex items-center space-x-4">
              <span>${(i.price * i.qty).toLocaleString()}</span>
              <button
                onClick={() => removeFromCart(i._id)}
                className="text-red-500 hover:text-red-700 transition"
              >
                Quitar
              </button>
            </div>
          </li>
        ))}
        <li className="flex justify-between font-semibold pt-4 border-t">
          <span>Total:</span>
          <span>${total.toLocaleString()}</span>
        </li>
      </ul>

      {!clientSecret ? (
        <button
          onClick={createPayment}
          className="w-full py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
          disabled={items.length === 0}
        >
          Proceder al pago
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <CardElement className="p-4 border rounded" />
          <button
            type="submit"
            className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            Confirmar pago
          </button>
        </form>
      )}
    </div>
  );
}

export default function Checkout() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}

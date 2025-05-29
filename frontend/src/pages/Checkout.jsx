import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { loadStripe } from '@stripe/stripe-js';
import api from '../services/api';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export default function Checkout() {
  const { items, total, removeFromCart } = useContext(CartContext);

  const handleCheckout = async () => {
    const stripe = await stripePromise;
    const { data } = await api.post('/payments/create-checkout-session', {
      items: items.map(item => ({
        name: item.name,
        price: item.price,
        quantity: item.qty || 1
      }))
    });
    stripe.redirectToCheckout({ sessionId: data.sessionId });
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

      <button
        onClick={handleCheckout}
        className="w-full py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
        disabled={items.length === 0}
      >
        Proceder al pago
      </button>
    </div>
  );
}

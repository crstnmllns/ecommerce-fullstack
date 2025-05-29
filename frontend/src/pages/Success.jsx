import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

export default function Success() {
  const location = useLocation();
  const { items, total, clearCart } = useContext(CartContext);
  const [status, setStatus] = useState('Procesando...');

  useEffect(() => {
    clearCart();
    setStatus('Pago exitoso 🎉');
  }, []);

  return (
    <div className="max-w-2xl mx-auto mt-12 text-center space-y-6">
      <h2 className="text-3xl font-bold text-green-600">{status}</h2>
      <ul className="text-left space-y-2">
        {items.map(i => (
          <li key={i._id}>
            {i.name} x{i.qty} — ${(i.price * i.qty).toLocaleString()}
          </li>
        ))}
      </ul>
      <p className="text-xl font-semibold">Total: ${total.toLocaleString()}</p>
    </div>
  );
}

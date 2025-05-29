import { useLocation } from 'react-router-dom';

export default function Success() {
  const location = useLocation();

  return (
    <div className="max-w-lg mx-auto mt-12 p-6 bg-green-100 text-green-900 rounded">
      <h1 className="text-2xl font-bold mb-4">¡Pago exitoso! 🎉</h1>
      <p>Gracias por tu compra. En breve recibirás un correo de confirmación.</p>
    </div>
  );
}

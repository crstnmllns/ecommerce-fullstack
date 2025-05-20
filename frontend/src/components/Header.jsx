import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

export default function Header() {
  const { user, logout } = useContext(AuthContext);
  const { items } = useContext(CartContext);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
        <Link to="/" className="text-2xl font-bold text-indigo-600 hover:text-indigo-700">
          Mi Tienda
        </Link>

        <nav className="hidden md:flex space-x-6">
          <Link to="/products" className="text-gray-700 hover:text-indigo-600">
            Productos
          </Link>
          <Link to="/checkout" className="text-gray-700 hover:text-indigo-600">
            Carrito ({items.length})
          </Link>
          {user ? (
            <>
              <span className="text-gray-700">Hola, <span className="font-medium">{user.name}</span></span>
              <button
                onClick={logout}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Salir
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-3 py-1 border border-indigo-500 text-indigo-500 rounded hover:bg-indigo-50 transition"
              >
                Signup
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
);
}

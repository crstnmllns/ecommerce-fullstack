import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

export default function Products() {
  const [list, setList] = useState([]);
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    api.get('/products')
      .then(res => setList(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('¿Eliminar este producto?')) return;
    await api.delete(`/products/${id}`);
    setList(list.filter(p => p._id !== id));
  };

  return (
    <main className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Nuestros Productos</h1>

        {user && (
          <Link
            to="/products/new"
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            Crear Producto
          </Link>
        )}
      </div>

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {list.map(p => (
          <div
            key={p._id}
            className="bg-white rounded-lg shadow hover:shadow-lg transition flex flex-col"
          >
            <Link to={`/product/${p._id}`}>
              <div
                className="h-48 bg-cover bg-center rounded-t-lg"
                style={{ backgroundImage: `url(${p.imageURL})` }}
              />
            </Link>
            <div className="p-4 flex-1 flex flex-col">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{p.name}</h2>
              <p className="text-gray-600 mb-4 flex-1">${p.price.toLocaleString()}</p>
              <div className="mt-auto flex space-x-2">
                <button
                  onClick={() => addToCart(p)}
                  className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
                >
                  Añadir al carrito
                </button>
                <Link
                  to={`/product/${p._id}`}
                  className="flex-1 px-4 py-2 border border-indigo-600 text-indigo-600 rounded hover:bg-indigo-50 transition text-center"
                >
                  Ver detalle
                </Link>
              </div>

              {user && (
                <div className="mt-4 flex space-x-2">
                  <Link
                    to={`/products/${p._id}/edit`}
                    className="flex-1 px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500 transition text-center"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="flex-1 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                  >
                    Eliminar
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

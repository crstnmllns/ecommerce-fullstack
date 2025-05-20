import { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [prod, setProd] = useState(null);
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    axios.get(`/api/products/${id}`)
      .then(res => setProd(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm('¿Eliminar este producto?')) return;
    await axios.delete(`/api/products/${id}`);
    navigate('/products');
  };

  if (!prod) return <p className="text-center mt-20">Cargando...</p>;

  return (
    <main className="max-w-4xl mx-auto p-6 flex flex-col lg:flex-row gap-8">
      <div className="flex-1">
        <img
          src={prod.imageURL}
          alt={prod.name}
          className="w-full h-auto rounded-lg shadow-lg object-cover"
        />
      </div>
      <div className="flex-1 flex flex-col">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">{prod.name}</h2>
        <p className="text-gray-700 mb-6 flex-1">{prod.description}</p>
        <p className="text-2xl font-semibold text-indigo-600 mb-6">
          ${prod.price.toLocaleString()}
        </p>
        <button
          onClick={() => addToCart(prod)}
          className="px-5 py-3 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition mb-4"
        >
          Añadir al carrito
        </button>

        {user && (
          <div className="flex space-x-4">
            <Link
              to={`/products/${prod._id}/edit`}
              className="flex-1 px-5 py-3 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 transition text-center"
            >
              Editar
            </Link>
            <button
              onClick={handleDelete}
              className="flex-1 px-5 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              Eliminar
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

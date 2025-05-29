import { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';

export default function ProductForm() {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const isEdit = Boolean(id);
  const nav = useNavigate();
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    imageURL: '',
    stock: ''
  });

  useEffect(() => {
    if (isEdit) {
      api.get(`/products/${id}`)
        .then(res => setForm({
          name: res.data.name,
          description: res.data.description,
          price: res.data.price,
          imageURL: res.data.imageURL,
          stock: res.data.stock
        }))
        .catch(err => console.error(err));
    }
  }, [id, isEdit]);

  if (!user) {
    return <p className="text-center text-red-500 mt-12">Acceso denegado</p>;
  }

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const payload = {
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
    };
    try {
      if (isEdit) {
        await api.put(`/products/${id}`, payload);
      } else {
        await api.post('/products', payload);
      }
      nav('/products');
    } catch (err) {
      console.error('Error al guardar producto:', err);
    }
  };

  return (
    <main className="max-w-md mx-auto mt-12 bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-indigo-600">
        {isEdit ? 'Editar Producto' : 'Nuevo Producto'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {['name','description','imageURL','price','stock'].map(field => (
          <input
            key={field}
            name={field}
            type={field === 'price' || field === 'stock' ? 'number' : 'text'}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={form[field]}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
        ))}
        <button
          type="submit"
          className="w-full py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
        >
          {isEdit ? 'Guardar Cambios' : 'Crear Producto'}
        </button>
      </form>
    </main>
  );
}

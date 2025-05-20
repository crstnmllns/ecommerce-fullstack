import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup } = useContext(AuthContext);
  const nav = useNavigate();

  const submit = async e => {
    e.preventDefault();
    await signup(name, email, password);
    nav('/login');
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] bg-gray-50">
      <form
        onSubmit={submit}
        className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-indigo-600">Crear Cuenta</h2>
        <input
          type="text"
          placeholder="Nombre completo"
          value={name}
          onChange={e => setName(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-300"
        />
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-300"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-300"
        />
        <button
          type="submit"
          className="w-full py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
        >
          Registrarse
        </button>
        <p className="text-center text-gray-600">
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" className="text-indigo-600 hover:underline">
            Inicia sesión
          </Link>
        </p>
      </form>
    </div>
  );
}

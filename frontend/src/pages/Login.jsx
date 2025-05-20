import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const nav = useNavigate();

  const submit = async e => {
    e.preventDefault();
    await login(email, password);
    nav('/');
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] bg-gray-50">
      <form
        onSubmit={submit}
        className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-indigo-600">Iniciar Sesión</h2>
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
          Entrar
        </button>
        <p className="text-center text-gray-600">
          ¿No tienes cuenta?{' '}
          <Link to="/signup" className="text-indigo-600 hover:underline">
            Regístrate
          </Link>
        </p>
      </form>
    </div>
  );
}

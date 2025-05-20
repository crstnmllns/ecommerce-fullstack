import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Profile() {
  const { user } = useContext(AuthContext);
  if (!user) return <p>Acceso no autorizado</p>;
  return (
    <div className="max-w-sm mx-auto">
      <h2 className="text-xl mb-4">Perfil</h2>
      <p><strong>Nombre:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
    </div>
  );
}
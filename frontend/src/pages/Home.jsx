import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-[80vh] bg-gradient-to-br from-indigo-100 to-white">
      <h1 className="text-5xl font-extrabold text-indigo-600 mb-6">Bienvenido a Mi Tienda</h1>
      <p className="text-gray-600 mb-8 text-center max-w-xl">
        Explora nuestra increíble selección de productos y disfruta de una experiencia de compra rápida y segura.
      </p>
      <Link
        to="/products"
        className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
      >
        Ver Productos
      </Link>
    </main>
  );
}

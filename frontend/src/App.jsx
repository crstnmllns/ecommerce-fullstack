import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import Checkout from './pages/Checkout';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import ProductForm from './pages/ProductForm';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Header />
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/products/:id/edit" element={<ProductForm />} />
            <Route path="/products/new" element={<ProductForm />} />
          </Routes>
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
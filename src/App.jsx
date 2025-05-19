import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Login from './components/Login';
import Register from './components/Register';
import Catalogue from './components/Catalogue';
import Cart from './components/Cart';
import Wishlist from './components/Wishlist';
import Contact from './components/Contact';
import Profile from './components/Profile';
import PrivateRoute from './components/PrivateRoute';
import About from './components/About';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <div className="flex">
            <Routes>
              <Route path="/" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/*"
                element={
                  <PrivateRoute>
                    <div className="flex w-full">
                      <Sidebar />
                      <main className="flex-1 p-8">
                        <Routes>
                          <Route path="/catalogue" element={<Catalogue />} />
                          <Route path="/cart" element={<Cart />} />
                          <Route path="/wishlist" element={<Wishlist />} />
                          <Route path="/contact" element={<Contact />} />
                          <Route path="/profile" element={<Profile />} />
                        </Routes>
                      </main>
                    </div>
                  </PrivateRoute>
                }
              />
            </Routes>
          </div>
          <ToastContainer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

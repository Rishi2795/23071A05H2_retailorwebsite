import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ShoppingBagIcon,
  HeartIcon, 
  UserIcon,
  ShoppingCartIcon,
  PhoneIcon 
} from '@heroicons/react/24/outline';

function Sidebar() {
  const menuItems = [
    { path: '/catalogue', icon: ShoppingBagIcon, label: 'Catalogue' },
    { path: '/cart', icon: ShoppingCartIcon, label: 'Cart' },
    { path: '/wishlist', icon: HeartIcon, label: 'Wishlist' },
    { path: '/contact', icon: PhoneIcon, label: 'Contact' },
    { path: '/profile', icon: UserIcon, label: 'Profile' },
  ];

  return (
    <motion.div 
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      className="w-64 h-screen bg-white shadow-lg"
    >
      <div className="p-6">
        <h2 className="text-2xl font-bold text-blue-600 mb-6">Menu</h2>
        <nav>
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                flex items-center p-3 mb-2 rounded-lg transition-all duration-300
                ${isActive 
                  ? 'bg-blue-500 text-white' 
                  : 'text-gray-700 hover:bg-blue-50'
                }
              `}
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center"
              >
                <item.icon className="w-6 h-6 mr-3" />
                <span className="font-medium">{item.label}</span>
              </motion.div>
            </NavLink>
          ))}
        </nav>
      </div>
    </motion.div>
  );
}

export default Sidebar;

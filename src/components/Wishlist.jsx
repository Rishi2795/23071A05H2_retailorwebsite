import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleAddToGarden = async (plantId) => {
    try {
      await axios.post(`http://localhost:5000/api/plants/garden/${plantId}`, {}, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      toast.success('Plant added to your garden!');
      fetchWishlist(); // Refresh wishlist after moving the plant
    } catch (error) {
      console.error('Error adding to garden:', error.message);
      toast.error('Failed to add plant to garden');
    }
  };
// make this a styling application instead of plants change the menu and pages according to that make the theme blue and white
  const handleRemoveFromWishlist = async (plantId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/plants/wishlist/${plantId}`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      if (response.data) {
        fetchWishlist();
        toast.success('Plant removed from wishlist');
      }
    } catch (error) {
      toast.error('Failed to remove plant');
    }
  };

  useEffect(() => {
    if (user?.token) {
      const fetchWishlist = async () => {
        try {
          setLoading(true);
          const response = await axios.get('http://localhost:5000/api/plants/wishlist', {
            headers: { Authorization: `Bearer ${user.token}` }
          });
          setWishlist(response.data || []);
        } catch (error) {
          console.error('Error fetching wishlist:', error);
          toast.error('Failed to load wishlist');
        } finally {
          setLoading(false);
        }
      };

      fetchWishlist();
    }
  }, [user]);

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-gray-800 mb-8"
      >
        My Wishlist
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {wishlist.map(plant => (
          <WishlistCard 
            key={plant._id}
            plant={plant}
            onAddToGarden={() => handleAddToGarden(plant._id)}
            onRemove={() => handleRemoveFromWishlist(plant._id)}
          />
        ))}
      </div>
    </div>
  );
}

const WishlistCard = ({ plant, onAddToGarden, onRemove }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="bg-white rounded-2xl shadow-lg overflow-hidden"
  >
    <img 
      src={plant.images[0]} 
      alt={plant.name}
      className="w-full h-48 object-cover"
    />
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-4">{plant.name}</h3>
      <div className="space-y-4">
        <button
          onClick={onAddToGarden}
          className="w-full bg-primary-500 text-white py-2 rounded-xl hover:bg-primary-600 transition-colors"
        >
          Add to Garden
        </button>
        <button
          onClick={onRemove}
          className="w-full bg-red-500 text-white py-2 rounded-xl hover:bg-red-600 transition-colors"
        >
          Remove from Wishlist
        </button>
      </div>
    </div>
  </motion.div>
);

export default Wishlist;

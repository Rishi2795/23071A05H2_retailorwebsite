import { motion } from 'framer-motion';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

function Profile() {
  const { user, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg p-8"
      >
        <div className="flex items-center space-x-4 mb-8">
          <motion.div 
            whileHover={{ scale: 1.1 }}
            className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center"
          >
            <span className="text-2xl text-white font-bold">
              {user?.firstName?.[0]}{user?.lastName?.[0]}
            </span>
          </motion.div>
          <div>
            <h1 className="text-2xl font-bold">{user?.firstName} {user?.lastName}</h1>
            <p className="text-gray-600">{user?.email}</p>
          </div>
        </div>

        <motion.div 
          layout
          className="space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h3 className="font-semibold">Garden Stats</h3>
              <div className="bg-green-50 p-4 rounded-lg">
                <p>Total Plants: 0</p>
                <p>Wishlist Items: 0</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-semibold">Notifications</h3>
              <div className="bg-green-50 p-4 rounded-lg">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded text-green-500" />
                  <span>Email notifications</span>
                </label>
              </div>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors"
            onClick={() => setIsEditing(!isEditing)}
          >
            Edit Profile
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Profile;

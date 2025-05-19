import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChartBarIcon, SunIcon, CloudIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

function MyGarden() {
  const [plants, setPlants] = useState([]);
  const [gardenStats, setGardenStats] = useState({
    totalPlants: 0,
    indoorPlants: 0,
    outdoorPlants: 0,
    needsWatering: 0
  });
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user?.token) {
      const fetchGardenData = async () => {
        try {
          setLoading(true);
          const response = await axios.get('http://localhost:5000/api/plants/garden', {
            headers: { Authorization: `Bearer ${user.token}` }
          });
          
          if (response.data) {
            setPlants(response.data.plants);
            setGardenStats(response.data.stats);
          }
        } catch (error) {
          console.error('Error fetching garden:', error);
          toast.error('Failed to load your garden');
        } finally {
          setLoading(false);
        }
      };

      fetchGardenData();
    }
  }, [user]);

  const handleRemoveFromGarden = async (plantId) => {
    try {
      await axios.delete(`http://localhost:5000/api/plants/garden/${plantId}`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      toast.success('Plant removed from garden');
      const fetchGardenData = async () => {
        try {
          setLoading(true);
          const response = await axios.get('http://localhost:5000/api/plants/garden', {
            headers: { Authorization: `Bearer ${user.token}` }
          });
          
          if (response.data) {
            setPlants(response.data.plants);
            setGardenStats(response.data.stats);
          }
        } catch (error) {
          console.error('Error fetching garden:', error);
          toast.error('Failed to load your garden');
        } finally {
          setLoading(false);
        }
      };
      await fetchGardenData();
    } catch (error) {
      console.error('Error removing from garden:', error.message);
      toast.error('Failed to remove plant from garden');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <motion.div
          animate={{
            rotate: 360,
            borderRadius: ["25%", "25%", "50%", "50%", "25%"]
          }}
          transition={{
            duration: 2,
            ease: "linear",
            repeat: Infinity
          }}
          className="w-16 h-16 border-4 border-green-700 border-t-transparent"
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-gray-800 mb-8"
      >
        My Garden
      </motion.h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Plants"
          value={gardenStats.totalPlants}
          icon={ChartBarIcon}
          color="green"
        />
        <StatsCard
          title="Indoor Plants"
          value={gardenStats.indoorPlants}
          icon={SunIcon}
          color="blue"
        />
        <StatsCard
          title="Outdoor Plants"
          value={gardenStats.outdoorPlants}
          icon={CloudIcon}
          color="purple"
        />
        <StatsCard
          title="Needs Watering"
          value={gardenStats.needsWatering}
          icon={CloudIcon}
          color="yellow"
        />
      </div>

      {/* Plants Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plants.map(plant => (
          <GardenPlantCard 
            key={plant._id} 
            plant={plant}
            onRemove={() => handleRemoveFromGarden(plant._id)}
          />
        ))}
      </div>
    </div>
  );
}

// Component for stats cards
const StatsCard = ({ title, value, icon: Icon, color }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className={`bg-white p-6 rounded-xl shadow-lg border-l-4 border-${color}-500`}
  >
    <div className="flex justify-between items-center">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
      <Icon className={`w-8 h-8 text-${color}-500`} />
    </div>
  </motion.div>
);

// Component for garden plant cards
const GardenPlantCard = ({ plant, onRemove }) => (
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
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Care Level:</span>
          <span className="font-medium">{plant.difficulty}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Light Needs:</span>
          <span className="font-medium">{plant.light}</span>
        </div>
        <button
          onClick={onRemove}
          className="w-full bg-red-500 text-white py-2 rounded-xl hover:bg-red-600 transition-colors"
        >
          Remove from Garden
        </button>
      </div>
    </div>
  </motion.div>
);

export default MyGarden;

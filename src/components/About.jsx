import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  LightBulbIcon, 
  HeartIcon, 
  SparklesIcon 
} from '@heroicons/react/24/outline';

function About() {
  const features = [
    {
      icon: LightBulbIcon,
      title: "Discovery",
      description: "Explore a vast collection of clothing and brands"
    },
    {
      icon: HeartIcon,
      title: "Personal wardrobe",
      description: "Create and manage your own wardrobe with unique styles and colors"
    },
    {
      icon: SparklesIcon,
      title: "Expert Tips",
      description: "Get styling tips from top influencers and fashion experts to enhance your wardrobe"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white w-full">
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-blue-400 mb-6">
            Welcome to Styleyou
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your personal styling assistant and recommendations with expert guidance.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-white p-8 rounded-xl shadow-xl hover:shadow-2xl transition-shadow"
            >
              <feature.icon className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <Link
            to="/login"
            className="inline-block bg-gray-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-400 transition-colors"
          >
            Get Started
          </Link>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 grid md:grid-cols-2 gap-8 items-center"
        >
          <div className="bg-blue-100 p-8 rounded-xl">
            <h2 className="text-3xl font-bold text-blue-500 mb-4">Why Choose StyleYou?</h2>
            <ul className="space-y-4">
              <li className="flex items-center text-gray-700">
                <CheckIcon className="w-6 h-6 text-indigo-600 mr-2" />
                Outfits for occasions
              </li>
              <li className="flex items-center text-gray-700">
                <CheckIcon className="w-6 h-6 text-blue-600 mr-2" />
                Personalized wardrobe recommendations
              </li>
              <li className="flex items-center text-gray-700">
                <CheckIcon className="w-6 h-6 text-blue-600 mr-2" />
                Attractive offers on various brands
              </li>
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4">
          </div>
        </motion.div>
      </div>
    </div>
  );
}

const CheckIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

export default About;
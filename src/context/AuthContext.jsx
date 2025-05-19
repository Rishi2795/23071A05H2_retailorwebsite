import { createContext, useState, useContext } from 'react';
import { toast } from 'react-toastify';

const AuthContext = createContext({});

// Test credentials
const TEST_CREDENTIALS = {
  email: 'test@example.com',
  password: 'test123',
  firstName: 'Test',
  lastName: 'User'
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  const login = async (email, password) => {
    try {
      // Simulate API call with test credentials
      if (email === TEST_CREDENTIALS.email && password === TEST_CREDENTIALS.password) {
        const userData = {
          email: TEST_CREDENTIALS.email,
          firstName: TEST_CREDENTIALS.firstName,
          lastName: TEST_CREDENTIALS.lastName,
          token: 'test-token-123'
        };
        
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        return { success: true };
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      return { 
        success: false, 
        error: 'Invalid email or password. Try test@example.com / test123'
      };
    }
  };

  const register = async (userData) => {
    try {
      // Simulate API call
      const newUser = {
        ...userData,
        token: 'test-token-123'
      };
      
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: 'Registration failed. Please try again.' 
      };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

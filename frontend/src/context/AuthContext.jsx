import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../config/ApiConfig';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const signup = async (username, emailId, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/signup`, { username, emailId, password });
      const { token } = response.data;
      setUser({ username, token });
      localStorage.setItem('token', token);
      navigate('/');
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  };

  const login = async (emailId, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, { emailId, password });
      const { token } = response.data;
      const username = email;
      setUser({ username, token });
      localStorage.setItem('token', token);
      navigate('/'); 
    } catch (error) {
      console.error('Login error:', error);
      throw error; 
    }
  };

  const logout = () => {
    setUser(null); 
    localStorage.removeItem('token'); 
    navigate('/login'); 
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
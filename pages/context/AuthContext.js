// context/AuthContext.js

import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [name,setName] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const login = (token,name,id) => {
    setToken(token);
    setUserId(id);
    localStorage.setItem('token', token); // Store token in localStorage
    localStorage.setItem('name',name);
    console.log(userId);
    setName(name);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token'); // Remove token from localStorage
    localStorage.removeItem('name');
    setName(null);
    setUserId(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout,name,userId }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

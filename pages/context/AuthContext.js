// context/AuthContext.js

import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [name,setName] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const login = (token,name) => {
    setToken(token);
    localStorage.setItem('token', token); // Store token in localStorage
    localStorage.setItem('name',name);
    setName(name);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token'); // Remove token from localStorage
    localStorage.removeItem('name');
    setName(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout,name }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

import axios from "axios";
import React, { createContext, useState, useContext, useEffect } from "react";

const userContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ Start with loading true

  useEffect(() => {
    const verifyUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await axios.get("http://localhost:3000/api/auth/verify", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log(response);
          if (response.data.success) {
            setUser(response.data.user);
          } else {
            setUser(null);
            localStorage.removeItem("token"); // ✅ Remove invalid token
          }
        } catch (error) {
          console.log(error);
          setUser(null);
          localStorage.removeItem("token"); // ✅ Remove invalid token
        }
      }
      setLoading(false); // ✅ Always set loading to false after verification
    };

    verifyUser();
  }, []); // ✅ Remove navigate dependency

  const login = (user) => {
    setUser(user);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    // Don't navigate here - let components handle navigation
  };

  return (
    <userContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </userContext.Provider>
  );
};

export const useAuth = () => useContext(userContext);

export default AuthProvider;
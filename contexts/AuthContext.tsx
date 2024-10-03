import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, FC, ReactNode, useEffect, useState } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("token");
      setIsAuthenticated(!!token);
    };

    checkToken();
  }, []);

  const login = async (token: string) => {
    await AsyncStorage.setItem("token", token);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    await AsyncStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

import React, { createContext, useState } from "react";

interface AuthContextProps {
  authToken: string | null;
  setToken: (token: string | null) => void;
}

export const AuthContext = createContext<AuthContextProps>({
  authToken: null,
  setToken: () => {},
});

export const AuthProvider: React.FC = ({ children }) => {
  const [authToken, setAuthToken] = useState<string | null>(null);

  const setToken = (token: string | null) => {
    setAuthToken(token);
  };

  return (
    <AuthContext.Provider value={{ authToken, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

import React, { createContext, useContext, useState } from "react";

type User = {
  id: string;
  username: string;
  firstName: string;
  avatar: string;
  email: string;
  token: string;
};

type AuthContextData = {
  user: User;
};

export const AuthContext = createContext({} as AuthContextData);

const USER_TEST = {
  id: "1",
  username: "Rennan Prysthon",
  firstName: "Rennan",
  avatar: "https://www.github.com/rennanprysthon.png",
  email: "rennandelcastillo@gmail.com",
  token: "sdasdasdasda",
};

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User>(USER_TEST);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;

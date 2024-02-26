import { createContext, useContext, useState, ReactNode } from 'react';
import axios from 'axios';

interface User {
  // define the structure of your user object
  // for example:
  id: number;
  username: string;
  email: string;
  // add more properties as needed
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  csrfToken: () => Promise<boolean>;
}

const AuthContent = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  csrfToken: async () => false,
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, _setUser] = useState<User | null>(
    JSON.parse(localStorage.getItem('user') || 'null')
  );

  // set user to local storage
  const setUser = (user: User | null) => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
    _setUser(user);
  };

  // csrf token generation for user methods
  const csrfToken = async (): Promise<boolean> => {
    // await axios.get('http://localhost:8000/sanctum/csrf-cookie');
    await axios.get(`$(import.meta.env.REACT_APP_BACKEND_API)/sanctum/csrf-cookie`);
    return true;
  };

  return (
    <AuthContent.Provider value={{ user, setUser, csrfToken }}>
      {children}
    </AuthContent.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  return useContext(AuthContent);
};

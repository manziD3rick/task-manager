import { createContext, useContext, useState, useEffect } from 'react';
import { getMe, loginUser, signupUser, logoutUser } from '../api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMe()
      .then(setUser)
      .finally(() => setLoading(false));
  }, []);

  async function login(username, password) {
    const data = await loginUser(username, password);
    if (data.error) throw new Error(data.error);
    setUser(data);
  }

  async function signup(username, password) {
    const data = await signupUser(username, password);
    if (data.error) throw new Error(data.error);
    setUser(data);
  }

  async function logout() {
    await logoutUser();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

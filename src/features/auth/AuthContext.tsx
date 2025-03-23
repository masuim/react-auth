import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import Cookies from "universal-cookie";
import { User, LoginCredentials, SignupCredentials } from "../../types/auth";
import { mockAuth } from "../../mocks/auth";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (
    credentials: LoginCredentials
  ) => Promise<{ success: boolean; message?: string }>;
  signup: (
    credentials: SignupCredentials
  ) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);
const cookies = new Cookies();
const TOKEN_KEY = "auth_token";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback(async (credentials: LoginCredentials) => {
    const response = await mockAuth.login(
      credentials.email,
      credentials.password
    );

    if (response.status === "success") {
      setUser(response.data.user);
      cookies.set(TOKEN_KEY, response.data.token, { path: "/" });
      return { success: true };
    }

    return { success: false, message: response.message };
  }, []);

  const signup = useCallback(async (credentials: SignupCredentials) => {
    const response = await mockAuth.signup(
      credentials.email,
      credentials.password,
      credentials.name
    );

    if (response.status === "success") {
      setUser(response.data.user);
      cookies.set(TOKEN_KEY, response.data.token, { path: "/" });
      return { success: true };
    }

    return { success: false, message: response.message };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    cookies.remove(TOKEN_KEY, { path: "/" });
  }, []);

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import apiService from "../services/api";

// User interface
interface User {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  role: string;
  groupId: string;
  savings?: number;
  joinedAt?: string;
}

// Group interface
interface Group {
  id: string;
  name: string;
  groupId: string;
  president: string;
  totalAmount?: number;
  currentBalance?: number;
  savingMonth: string;
  savingYear: string;
}

// Auth state interface
interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  group: Group | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  serverConnected: boolean;
}

// Auth context interface
interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  registerLeader: (data: any) => Promise<void>;
  logout: () => void;
  clearError: () => void;
  tryConnectServer: () => Promise<boolean>;
}

// Create auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Initial auth state
const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  group: null,
  token: localStorage.getItem("token"),
  loading: false,
  error: null,
  serverConnected: true, // Assume connected until proven otherwise
};

// Demo user for development
const DEMO_USER = {
  id: "demo1234",
  name: "Demo User",
  email: "demo@example.com",
  phoneNumber: "9876543210",
  role: "leader",
  groupId: "group1234",
  savings: 2000,
  joinedAt: new Date().toISOString(),
};

// Demo group for development
const DEMO_GROUP = {
  id: "group1234",
  name: "Demo Self Help Group",
  groupId: "SHG1234",
  president: "Demo Leader",
  totalAmount: 10000,
  currentBalance: 8000,
  savingMonth: "May",
  savingYear: "2024",
};

// Auth Provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<AuthState>(initialState);

  // Function to check server connection
  const tryConnectServer = async (): Promise<boolean> => {
    try {
      // Try to connect to the server's health endpoint
      await apiService.healthCheck();
      setState((prev) => ({ ...prev, serverConnected: true }));
      return true;
    } catch (error) {
      console.error("Server connection failed:", error);
      setState((prev) => ({
        ...prev,
        serverConnected: false,
        error: "Server connection failed. Using demo mode.",
      }));

      // In development, load demo data after connection failure
      if (process.env.NODE_ENV === "development") {
        setState((prev) => ({
          ...prev,
          isAuthenticated: true,
          user: DEMO_USER,
          group: DEMO_GROUP,
        }));
      }

      return false;
    }
  };

  // Check if user is authenticated on mount
  useEffect(() => {
    const loadUser = async () => {
      if (state.token) {
        try {
          setState((prev) => ({ ...prev, loading: true }));

          // Try to connect to server first
          const isConnected = await tryConnectServer();

          if (isConnected) {
            const response = await apiService.getCurrentUser();
            setState((prev) => ({
              ...prev,
              isAuthenticated: true,
              user: response.data.data.user,
              group: response.data.data.group,
              loading: false,
            }));
          } else {
            setState((prev) => ({
              ...prev,
              loading: false,
            }));
          }
        } catch (error) {
          console.error("Error loading user:", error);
          localStorage.removeItem("token");
          setState((prev) => ({
            ...prev,
            isAuthenticated: false,
            user: null,
            group: null,
            token: null,
            loading: false,
            error: "Session expired. Please login again.",
          }));
        }
      } else {
        // Just check server connection
        tryConnectServer();
      }
    };

    loadUser();
  }, [state.token]);

  // Login function
  const login = async (email: string, password: string) => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }));

      // Check server connection first
      const isConnected = await tryConnectServer();

      if (!isConnected) {
        if (
          process.env.NODE_ENV === "development" &&
          email === "demo@example.com" &&
          password === "password"
        ) {
          // Demo login for development
          setState((prev) => ({
            ...prev,
            isAuthenticated: true,
            user: DEMO_USER,
            group: DEMO_GROUP,
            loading: false,
          }));
          return;
        }

        setState((prev) => ({
          ...prev,
          loading: false,
          error: "Server not available. Please try again later.",
        }));
        return;
      }

      const response = await apiService.login(email, password);
      const { token, user, group } = response.data.data;

      localStorage.setItem("token", token);

      setState((prev) => ({
        ...prev,
        isAuthenticated: true,
        user,
        group,
        token,
        loading: false,
      }));
    } catch (error: any) {
      console.error("Login error:", error);
      setState((prev) => ({
        ...prev,
        loading: false,
        error:
          error.response?.data?.message || "Login failed. Please try again.",
      }));
    }
  };

  // Register leader function
  const registerLeader = async (data: any) => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }));

      // Check server connection first
      const isConnected = await tryConnectServer();

      if (!isConnected) {
        setState((prev) => ({
          ...prev,
          loading: false,
          error: "Server not available. Please try again later.",
        }));
        return;
      }

      const response = await apiService.registerLeader(data);
      const { token, user, group } = response.data.data;

      localStorage.setItem("token", token);

      setState((prev) => ({
        ...prev,
        isAuthenticated: true,
        user,
        group,
        token,
        loading: false,
      }));
    } catch (error: any) {
      console.error("Registration error:", error);
      setState((prev) => ({
        ...prev,
        loading: false,
        error:
          error.response?.data?.message ||
          "Registration failed. Please try again.",
      }));
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    setState({
      ...initialState,
      token: null,
      serverConnected: state.serverConnected,
    });
  };

  // Clear error function
  const clearError = () => {
    setState((prev) => ({ ...prev, error: null }));
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        registerLeader,
        logout,
        clearError,
        tryConnectServer,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;

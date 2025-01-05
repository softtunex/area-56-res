import React, { createContext, useState, ReactNode, useContext } from "react";

// Extend User Interface
interface User {
  isAuthenticated: boolean;
  role: string; // e.g., "superadmin", "waiter", "vendor"
  name?: string; // Optional name property
  avatar?: string; // Optional avatar URL
}

// Context Properties
interface UserContextProps {
  user: User;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

// Default Context Values
export const UserContext = createContext<UserContextProps>({
  user: { isAuthenticated: false, role: "" },
  login: () => false,
  logout: () => {},
});

// Provider Props
interface UserProviderProps {
  children: ReactNode;
}

// Hardcoded Credentials
const hardcodedCredentials: Record<
  string,
  { password: string; role: string; name: string; avatar: string }
> = {
  b: {
    password: "b",
    role: "superadmin",
    name: "Super Admin",
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  a: {
    password: "a",
    role: "waiter",
    name: "Ajayi Olasola",
    avatar: "https://i.pravatar.cc/150?img=12",
  },
  "vendor@example.com": {
    password: "vendor123",
    role: "vendor",
    name: "Vendor User",
    avatar: "https://i.pravatar.cc/150?img=3",
  },
};

// User Provider Component
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser
      ? JSON.parse(savedUser)
      : { isAuthenticated: false, role: "" };
  });

  // Login Function
  const login = (email: string, password: string): boolean => {
    const userData = hardcodedCredentials[email];
    if (userData && userData.password === password) {
      const newUser = {
        isAuthenticated: true,
        role: userData.role,
        name: userData.name,
        avatar: userData.avatar,
      };
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser)); // Save user to localStorage
      return true;
    }
    return false;
  };

  // Logout Function
  const logout = () => {
    setUser({ isAuthenticated: false, role: "" });
    localStorage.removeItem("user"); // Clear user from localStorage
    window.location.href = "/login";
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom Hook for Using User Context
export const useUserContext = () => useContext(UserContext);

import React, { createContext, useState, ReactNode } from "react";

interface User {
  isAuthenticated: boolean;
  role: string; // e.g., "superadmin", "waiter", "vendor"
}

interface UserContextProps {
  user: User;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

export const UserContext = createContext<UserContextProps>({
  user: { isAuthenticated: false, role: "" },
  login: () => false,
  logout: () => {},
});

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>({ isAuthenticated: false, role: "" });

  const login = (email: string, password: string): boolean => {
    // Define hardcoded credentials with Record type
    const hardcodedCredentials: Record<
      string,
      { password: string; role: string }
    > = {
      b: {
        password: "b",
        role: "superadmin",
      },
      a: { password: "a", role: "waiter" },
      "vendor@example.com": { password: "vendor123", role: "vendor" },
    };

    const userData = hardcodedCredentials[email];

    if (userData && userData.password === password) {
      setUser({ isAuthenticated: true, role: userData.role });
      return true;
    }

    return false; // Return false if authentication fails
  };

  const logout = () => {
    setUser({ isAuthenticated: false, role: "" });
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

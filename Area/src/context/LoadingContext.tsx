import React, { createContext, useState, useContext, ReactNode } from "react";

interface LoadingContextType {
  isLoading: boolean;
  setLoading: (state: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isLoading, setLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ isLoading, setLoading }}>
      {isLoading && <Loader />}
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = (): LoadingContextType => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};

const Loader = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-1 z-50">
    <img
      src="/assets/pizza-loader.gif"
      alt="Loading..."
      className="w-16 h-16 animate-spin-slow"
    />
  </div>
);

"use client";
import { UserDAO } from "@/models/user";
import { getUser } from "@/services/user";
import { useQuery } from "@tanstack/react-query";
import { ReactNode, createContext, useEffect, useState } from "react";

export const AuthContext = createContext<{
  isLogged: boolean | undefined;
  user: UserDAO | undefined;
}>({ isLogged: false, user: undefined });

export const HandleAuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLogged, setIsLogged] = useState<boolean | undefined>();
  const { data: user, isFetched } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUser(),
  });

  useEffect(() => {
    if (!isFetched) return;

    if (user && localStorage.getItem("token")) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
  }, [user, isFetched]);

  return (
    <AuthContext.Provider value={{ user: user?.data, isLogged }}>
      {children}
    </AuthContext.Provider>
  );
};

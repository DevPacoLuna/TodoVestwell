"use client";
import { Toast } from "@/components/toast/toast";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";

interface errorsMessage {
  type: "error" | "info" | "success" | "warning";
  message: string;
}
export const ErrorsContext = createContext<{
  setErrors: Dispatch<SetStateAction<errorsMessage[]>>;
  errors: errorsMessage[];
}>({ errors: [], setErrors: () => {} });

export const HandleErrorsProvider = ({ children }: { children: ReactNode }) => {
  const [errors, setErrors] = useState<errorsMessage[]>([]);

  return (
    <ErrorsContext.Provider value={{ errors, setErrors }}>
      {errors.map((error, index) => (
        <Toast key={index} type={error.type} index={index}>
          {error.message}
        </Toast>
      ))}
      {children}
    </ErrorsContext.Provider>
  );
};

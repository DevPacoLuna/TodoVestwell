import { ErrorsContext } from "@/providers/handleErrorsProvider";
import { Alert, Snackbar } from "@mui/material";
import { Dispatch, SetStateAction, useContext, useEffect } from "react";

export interface Toast {
  type: "error" | "info" | "success" | "warning";
  children: string;
  index: number;
}

export const Toast = ({ type, children, index }: Toast) => {
  const { setErrors, errors } = useContext(ErrorsContext);

  return (
    <Snackbar
      open={true}
      autoHideDuration={errors.length * 2000 - 1000 * index}
      onClose={() =>
        setErrors((prev) => prev.filter((_, i) => i !== index) ?? [])
      }
      ClickAwayListenerProps={{ onClickAway: () => null }}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert
        variant="filled"
        className="w-[370px]"
        onClose={() => {
          setErrors((prev) => prev.filter((_, i) => i !== index) ?? []);
        }}
        severity={type}
        data-testid="toast"
      >
        {type === "error" ? `Error: ${children}` : children}
      </Alert>
    </Snackbar>
  );
};

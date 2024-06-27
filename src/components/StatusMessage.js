import { Alert, Snackbar } from "@mui/material";
import React from "react";

export default function StatusMessage({ status, changeStatus }) {
  const closeFunction = () => {
    changeStatus ( {
      ...status,
      open:  false
    }) 
  };

  return (
    <Snackbar
      open={status.open}
      autoHideDuration={2 * 1000}
      onClose={closeFunction}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert
        onClose={closeFunction}
        severity={status.type}
        sx={{ width: "100%" }}
      >
        {status.message}
      </Alert>
    </Snackbar>
  );
}

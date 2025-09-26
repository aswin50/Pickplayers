import React from "react";
import { toast, Toaster } from "react-hot-toast";
import type { ToastOptions } from "react-hot-toast";

type ToastType = "success" | "error" | "loading" | "default";

export const showToast = (message: string, type: ToastType = "success") => {
  if (type === "success") toast.success(message);
  else if (type === "error") toast.error(message);
  else if (type === "loading") toast.loading(message);
  else toast(message);
};

export const ToastContainer: React.FC = () => {
  const toastOptions: ToastOptions = {
    duration: 3000,
    style: {
      background: "#333",
      color: "#fff",
    },
  };

  return <Toaster position="top-right" toastOptions={toastOptions} />;
};

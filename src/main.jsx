import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import MyContextProvider from "./context/MyContextProvider.jsx";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById("root")).render(
  
    <BrowserRouter>
    <MyContextProvider>
      <QueryClientProvider client={queryClient}>
      <App />
      </QueryClientProvider>
    </MyContextProvider>
    </BrowserRouter>
  
);

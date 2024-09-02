import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import App from "./App.tsx";
import "./index.css";
import AppContextProvider from "./contexts/AppContext.tsx";
import { AuthContextProvider } from "./contexts/AuthContext.tsx";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppContextProvider>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </AppContextProvider>
    </QueryClientProvider>
  </StrictMode>
);

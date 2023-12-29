// ClientSessionProvider.jsx
import { SessionProvider } from "next-auth/react";
import AppProvider from "../_context/AppContext";

const ClientSessionProvider = ({ children }) => {
  return (
    <SessionProvider>
      <AppProvider>{children}</AppProvider>
    </SessionProvider>
  );
};

export default ClientSessionProvider;

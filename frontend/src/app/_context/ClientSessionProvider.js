// ClientSessionProvider.jsx
import { SessionProvider } from "next-auth/react";
import StoreProvider from "../storeProvider";

const ClientSessionProvider = ({ children }) => {
  return (
    <StoreProvider>
      <SessionProvider>{children}</SessionProvider>
    </StoreProvider>
  );
};

export default ClientSessionProvider;

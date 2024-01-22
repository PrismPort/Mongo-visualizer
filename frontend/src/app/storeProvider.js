import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore } from "../lib/store"; // Import your store without AppStore

export default function StoreProvider({ children }) {
  const storeRef = useRef(null); // Remove the type annotation from useRef
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}

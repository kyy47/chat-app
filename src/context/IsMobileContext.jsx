import { createContext, useEffect, useState } from "react";

export const IsMobileContext = createContext();
function getCurrentDimension() {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
}
const IsMobileContextProvider = ({ children }) => {
  const { width } = getCurrentDimension();
  const [isMobile, setIsMobile] = useState(true);
  useEffect(() => {
    if (width >= 576) {
      setIsMobile(false);
    }
  }, []);
  return (
    <IsMobileContext.Provider
      value={{ isMobile, setIsMobile, getCurrentDimension }}
    >
      {children}
    </IsMobileContext.Provider>
  );
};

export default IsMobileContextProvider;

import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import AuthContextProvider from "./context/AuthContext.jsx";
import ChatContextProvider from "./context/ChatContext.jsx";
import IsMobileContextProvider from "./context/IsMobileContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <ChatContextProvider>
        <IsMobileContextProvider>
          <App />
        </IsMobileContextProvider>
      </ChatContextProvider>
    </AuthContextProvider>
  </StrictMode>
);

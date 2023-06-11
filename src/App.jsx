import "./app.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthContextProvider from "./context/AuthContext";
import { Login, Register, Chat, Home } from "../src/pages";
import ProtectedRoute from "./protected/ProtectedRoute";
import ChatContextProvider from "./context/ChatContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/chat",
    element: (
      <ProtectedRoute>
        <Chat />,
      </ProtectedRoute>
    ),
  },
]);
function App() {
  return (
    <AuthContextProvider>
      <ChatContextProvider>
        <div className="app">
          <RouterProvider router={router} />
        </div>
      </ChatContextProvider>
    </AuthContextProvider>
  );
}

export default App;

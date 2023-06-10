import Register from "./components/Register/Register";
import "./app.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home/Home";
import AuthContextProvider from "./context/AuthContext";
import Login from "./components/Login/Login";
import ProtectedRoute from "./protected/ProtectedRoute";
import ChatContextProvider from "./context/ChatContext";
import Chat from "./components/Chat/Chat";

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
    element: <Chat />,
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

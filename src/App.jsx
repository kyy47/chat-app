import "./app.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { useContext } from "react";
import { IsMobileContext } from "./context/IsMobileContext";
import ProtectedRoute from "./protected/ProtectedRoute";
import { Register, Login, Chat, Home } from "./pages";

function App() {
  const { isMobile } = useContext(IsMobileContext);

  return (
    <div className="app">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {isMobile ? <Route path="/chat" element={<Chat />} /> : null}
        </Routes>
      </Router>
    </div>
  );
}

export default App;

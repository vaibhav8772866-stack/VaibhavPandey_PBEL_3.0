import { BrowserRouter, Routes, Route } from "react-router-dom";

import ChatPage from "./Pages/ChatPage";
import AdminPage from "./Pages/AdminPage";
import Login from "./Pages/Login";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Chatbot Home */}
        <Route path="/" element={<ChatPage />} />

        {/* Admin Login */}
        <Route path="/login" element={<Login />} />

        {/* Protected Admin */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
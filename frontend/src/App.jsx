import { BrowserRouter, Routes, Route } from "react-router-dom";
import ChatPage from "./Pages/ChatPage";
import AdminPage from "./Pages/AdminPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ChatPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
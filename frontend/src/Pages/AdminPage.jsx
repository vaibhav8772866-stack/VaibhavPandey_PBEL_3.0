import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = "https://vaibhavpandey-pbel-3-0-1.onrender.com";

function AdminPage() {
  const navigate = useNavigate();

  const [faqs, setFaqs] = useState({});
  const [keyword, setKeyword] = useState("");
  const [answer, setAnswer] = useState("");
  const [search, setSearch] = useState("");
  const [editKeyword, setEditKeyword] = useState(null);

  const logout = () => {
    localStorage.removeItem("admin");
    navigate("/login");
  };

  // Load FAQs
  const loadFaqs = async () => {
    try {
      const res = await axios.get(`${API}/faqs`);
      setFaqs(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadFaqs();
  }, []);

  // Add or Update FAQ
  const saveFaq = async () => {
    if (!keyword.trim() || !answer.trim()) {
      alert("Please enter keyword and answer.");
      return;
    }

    try {
      if (editKeyword) {
        await axios.put(`${API}/faqs/${editKeyword}`, {
          answer,
        });

        alert("FAQ Updated Successfully");
      } else {
        await axios.post(`${API}/faqs`, {
          keyword,
          answer,
        });

        alert("FAQ Added Successfully");
      }

      setKeyword("");
      setAnswer("");
      setEditKeyword(null);

      loadFaqs();
    } catch (err) {
      console.error(err);
    }
  };

  // Delete FAQ
  const deleteFaq = async (key) => {
    if (!window.confirm("Delete this FAQ?")) return;

    try {
      await axios.delete(`${API}/faqs/${key}`);
      loadFaqs();
    } catch (err) {
      console.error(err);
    }
  };

  // Edit FAQ
  const editFaq = (key, value) => {
    setKeyword(key);
    setAnswer(value);
    setEditKeyword(key);
  };

  const filteredFaqs = Object.entries(faqs).filter(([key]) =>
    key.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        padding: "30px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "25px",
        }}
      >
        <h1>AI Student Chatbot - Admin Panel</h1>

        <button
          onClick={logout}
          style={{
            background: "#dc2626",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Logout
        </button>
      </div>

      <div
        style={{
          maxWidth: "700px",
          margin: "auto",
          background: "#1e293b",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <input
          type="text"
          placeholder="Keyword"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "5px",
          }}
        />

        <textarea
          placeholder="Answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          rows="4"
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "5px",
          }}
        />

        <button
          onClick={saveFaq}
          style={{
            width: "100%",
            padding: "12px",
            background: "#06b6d4",
            color: "white",
            border: "none",
            cursor: "pointer",
            fontWeight: "bold",
            borderRadius: "5px",
          }}
        >
          {editKeyword ? "Update FAQ" : "Add FAQ"}
        </button>
      </div>

      <div
        style={{
          maxWidth: "700px",
          margin: "30px auto",
        }}
      >
        <input
          type="text"
          placeholder="Search FAQ..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "20px",
            borderRadius: "5px",
          }}
        />

        {filteredFaqs.length === 0 ? (
          <p>No FAQs Found.</p>
        ) : (
          filteredFaqs.map(([key, value]) => (
            <div
              key={key}
              style={{
                background: "#1e293b",
                marginBottom: "15px",
                padding: "15px",
                borderRadius: "8px",
              }}
            >
              <h3>{key}</h3>

              <p>{value}</p>

              <button
                onClick={() => editFaq(key, value)}
                style={{
                  marginRight: "10px",
                  background: "green",
                  color: "white",
                  border: "none",
                  padding: "8px 15px",
                  cursor: "pointer",
                  borderRadius: "5px",
                }}
              >
                Edit
              </button>

              <button
                onClick={() => deleteFaq(key)}
                style={{
                  background: "red",
                  color: "white",
                  border: "none",
                  padding: "8px 15px",
                  cursor: "pointer",
                  borderRadius: "5px",
                }}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AdminPage;
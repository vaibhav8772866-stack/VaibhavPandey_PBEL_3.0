import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === "admin" && password === "admin123") {
      localStorage.setItem("admin", "true");
      alert("Login Successful");
      navigate("/admin");
    } else {
      alert("Invalid Username or Password");
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(135deg, #0f62fe 0%, #001d6c 100%)",
      }}
    >
      <div
        style={{
          width: "400px",
          background: "#fff",
          padding: "35px",
          borderRadius: "12px",
          boxShadow: "0 15px 35px rgba(0,0,0,.25)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "5px",
            color: "#0f62fe",
          }}
        >
          IBM
        </h1>

        <h2
          style={{
            textAlign: "center",
            marginBottom: "25px",
          }}
        >
          Admin Login
        </h2>

        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "15px",
              border: "1px solid #ccc",
              borderRadius: "6px",
              fontSize: "16px",
            }}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "20px",
              border: "1px solid #ccc",
              borderRadius: "6px",
              fontSize: "16px",
            }}
          />

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              background: "#0f62fe",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            Login
          </button>
        </form>

        <p
          style={{
            textAlign: "center",
            marginTop: "20px",
            color: "#555",
          }}
        >
          AI Student Support Chatbot
        </p>
      </div>
    </div>
  );
}

export default Login;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const response = await fetch(`${API_URL}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: pass }),
      });
      if (!response.ok) throw new Error("Credenciales incorrectas");
      const resData = await response.json();
      // Guarda token/flag en localStorage
      localStorage.setItem("admin_session", resData.token);
      navigate("/admin");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen flex justify-center items-center">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded shadow-lg max-w-xs w-full">
        <h2 className="text-2xl text-white font-bold mb-6 text-center">Admin Login</h2>
        {error && <div className="mb-3 text-red-400">{error}</div>}
        <input
          className="mb-3 w-full p-2 rounded bg-gray-700 text-white"
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          className="mb-6 w-full p-2 rounded bg-gray-700 text-white"
          type="password"
          placeholder="Password"
          value={pass}
          onChange={e => setPass(e.target.value)}
          required
        />
        <button className="w-full bg-blue-600 py-2 rounded text-white font-semibold" type="submit">
          Ingresar
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;

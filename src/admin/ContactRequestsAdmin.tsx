import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";


interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  createdAt: string;
}

const ContactRequestsAdmin: React.FC = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Cargar mensajes desde el backend
  useEffect(() => {
    setLoading(true);
    fetch("https://backendautohaven.onrender.com", {

      headers: {
        Authorization: `Bearer ${localStorage.getItem("admin_session") || ""}`
      }
    })
      .then(res => {
        if (!res.ok) throw new Error("Error al cargar los mensajes");
        return res.json();
      })
      .then(data => setMessages(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // Eliminar mensaje
  const handleDelete = async (id: string) => {
  toast((t) => (
    <span className="flex flex-col gap-2">
      <span>¿Er du sikker på at du vil slette denne meldingen?</span>
      <div className="flex gap-2 mt-2">
        <button
          onClick={async () => {
            toast.dismiss(t.id);

            const deletingToast = toast.loading("Eliminando mensaje...");
            try {
              const res = await fetch(`http://localhost:5000/api/contact/${id}`, {
                method: "DELETE",
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("admin_session") || ""}`
                }
              });
              if (!res.ok) throw new Error("No se pudo eliminar");
              setMessages((prev) => prev.filter((m) => m._id !== id));
              toast.dismiss(deletingToast);
              toast.success("Mensaje eliminado correctamente");
            } catch (err: any) {
              toast.dismiss(deletingToast);
              toast.error(err.message || "Error al eliminar");
            }
          }}
          className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700"
        >
          Eliminere
        </button>
        <button
          onClick={() => toast.dismiss(t.id)}
          className="px-3 py-1 rounded bg-gray-700 text-white hover:bg-gray-600"
        >
          Kansellere
        </button>
      </div>
    </span>
  ), { duration: 10000 });
};

  return (
  <div>
    <div className="flex items-center mb-4">
  <h2 className="text-xl text-white font-semibold mr-3">
    Kontaktforespørsler
  </h2>
  <span className="bg-blue-600 text-white font-bold text-sm px-3 py-1 rounded-full">
    {messages.length}
  </span>
</div>

    <div className="overflow-x-auto rounded-2xl shadow-2xl bg-gray-900 p-4">
      {loading && <div className="text-gray-200 p-8 text-center">Lading...</div>}
      {error && <div className="text-red-400 p-4 text-center">{error}</div>}
      {!loading && !error && (
        <table className="min-w-full table-auto bg-gray-800 rounded-xl shadow">
          <thead>
            <tr className="text-blue-300 text-lg">
              <th className="px-4 py-3">Navn</th>
              <th className="px-4 py-3">E-post</th>
              <th className="px-4 py-3">Telefon</th>
              <th className="px-4 py-3">Sak</th>
              <th className="px-4 py-3">Beskjed</th>
              <th className="px-4 py-3">Dato</th>
              <th className="px-4 py-3">Alternativer</th>
            </tr>
          </thead>
          <tbody>
            {messages.map(msg => (
              <tr key={msg._id} className="text-gray-200 hover:bg-gray-700 transition">
                <td className="px-4 py-2 font-semibold">{msg.name}</td>
                <td className="px-4 py-2">{msg.email}</td>
                <td className="px-4 py-2">{msg.phone || "-"}</td>
                <td className="px-4 py-2">{msg.subject || "-"}</td>
                <td className="px-4 py-2 max-w-[220px] truncate">{msg.message}</td>
                <td className="px-4 py-2">{new Date(msg.createdAt).toLocaleString()}</td>
                <td className="px-4 py-2">
                  <button
                    className="bg-red-600 hover:bg-red-800 px-3 py-1 rounded-lg shadow text-white font-bold transition"
                    onClick={() => handleDelete(msg._id)}
                  >
                    Eliminere
                  </button>
                </td>
              </tr>
            ))}
            {messages.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center text-gray-400 py-8 text-lg">
                  Ingen søknader ennå.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  </div>
);

};

export default ContactRequestsAdmin;

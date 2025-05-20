// src/components/Admin/AdminPracticeSubmissions.jsx
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, onSnapshot, updateDoc, doc, getDocs, deleteDoc, query, where } from "firebase/firestore";
import { useParams, useNavigate } from "react-router-dom";

export default function AdminPracticeSubmissions() {
  const { userId } = useParams();
  const [submissions, setSubmissions] = useState([]);
  const [userMap, setUserMap] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Получение пользователей и построение мапы UID -> nickname
  useEffect(() => {
    async function fetchUsers() {
      const usersSnap = await getDocs(collection(db, "users"));
      const map = {};
      usersSnap.forEach((doc) => {
        map[doc.id] = doc.data().nickname || doc.data().firstName || doc.id;
      });
      setUserMap(map);
    }
    fetchUsers();
  }, []);

  useEffect(() => {
    let unsub;
    if (userId) {
      const q = query(collection(db, "practice_submissions"), where("userId", "==", userId));
      unsub = onSnapshot(q, (snapshot) => {
        setSubmissions(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      });
    }
    return () => unsub && unsub();
  }, [userId]);

  const handleStatus = async (id, status, comment) => {
    setLoading(true);
    await updateDoc(doc(db, "practice_submissions", id), {
      status,
      comment,
      checkedAt: status === "pending" ? null : new Date(),
    });
    setLoading(false);
  };

  const handleDelete = async (id) => {
    setLoading(true);
    await deleteDoc(doc(db, "practice_submissions", id));
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#191A1D] p-8 text-white">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => navigate('/admin')}
          className="mb-4 px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 text-white font-semibold"
        >
          ← Назад к пользователям
        </button>
        <h2 className="text-3xl font-bold mb-8">Проверка практик</h2>
        <div className="overflow-x-auto rounded-lg shadow-lg bg-[#23262B]">
          <table className="min-w-full divide-y divide-gray-700">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left font-semibold">Пользователь</th>
                <th className="px-6 py-3 text-left font-semibold">Практика</th>
                <th className="px-6 py-3 text-left font-semibold">Файлы</th>
                <th className="px-6 py-3 text-left font-semibold">Статус</th>
                <th className="px-6 py-3 text-left font-semibold">Комментарий</th>
                <th className="px-6 py-3 text-left font-semibold">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {submissions.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-400">
                    Нет новых работ для проверки
                  </td>
                </tr>
              )}
              {submissions
                .slice()
                .sort((a, b) => {
                  const order = { pending: 0, rejected: 1, accepted: 2 };
                  return (order[a.status] ?? 99) - (order[b.status] ?? 99);
                })
                .map((s) => (
                  <tr key={s.id} className="hover:bg-[#282B30] transition">
                    <td className="px-6 py-4 break-all">
                      {userMap[s.userId] || <span className="text-gray-500">{s.userId}</span>}
                    </td>
                    <td className="px-6 py-4">{s.practiceId}</td>
                    <td className="px-6 py-4 space-y-2">
                      {s.files && s.files.map((file, idx) => (
                        <a
                          key={idx}
                          href={file.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-blue-400 underline hover:text-blue-200 transition"
                        >
                          Файл {idx + 1}
                        </a>
                      ))}
                    </td>
                    <td className="px-6 py-4">
                      {s.status === "pending" && (
                        <span className="bg-yellow-600/30 text-yellow-300 px-2 py-1 rounded-full text-xs font-medium">
                          На проверке
                        </span>
                      )}
                      {s.status === "accepted" && (
                        <span className="bg-green-700/40 text-green-300 px-2 py-1 rounded-full text-xs font-medium">
                          Принято
                        </span>
                      )}
                      {s.status === "rejected" && (
                        <span className="bg-red-800/40 text-red-300 px-2 py-1 rounded-full text-xs font-medium">
                          Не принято
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-300 align-top">
                      <div className="w-80 max-w-xs max-h-24 overflow-y-auto whitespace-pre-line break-words">
                        {s.comment || <span className="text-gray-500">—</span>}
                      </div>
                    </td>
                    <td className="px-6 py-4 space-x-2 align-top">
                      <div className="flex flex-col gap-2 items-start">
                        <button
                          className="inline-block px-4 py-1 rounded bg-green-600 hover:bg-green-700 text-white font-semibold shadow-sm disabled:bg-green-900/50 disabled:cursor-not-allowed transition"
                          onClick={() => handleStatus(s.id, "accepted", "")}
                          disabled={loading || s.status === "accepted"}
                        >
                          Принять
                        </button>
                        <button
                          className="inline-block px-4 py-1 rounded bg-red-600 hover:bg-red-700 text-white font-semibold shadow-sm disabled:bg-red-900/50 disabled:cursor-not-allowed transition"
                          onClick={async () => {
                            const comment = prompt("Комментарий для отклонения:");
                            if (comment) await handleStatus(s.id, "rejected", comment);
                          }}
                          disabled={loading || s.status === "rejected"}
                        >
                          Отклонить
                        </button>
                        <button
                          className="inline-block px-4 py-1 rounded bg-yellow-400 hover:bg-yellow-500 text-black font-semibold shadow-sm transition"
                          onClick={() => handleStatus(s.id, "pending", "")}
                          disabled={loading || s.status === "pending"}
                        >
                          На проверку
                        </button>
                        <button
                          className="inline-block px-4 py-1 rounded bg-red-800 hover:bg-red-900 text-white font-semibold shadow-sm transition"
                          onClick={async () => {
                            if (window.confirm("Удалить эту практику? Это действие необратимо!")) {
                              await handleDelete(s.id);
                            }
                          }}
                          disabled={loading}
                        >
                          Удалить
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
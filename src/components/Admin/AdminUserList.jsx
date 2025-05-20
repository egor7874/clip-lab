import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function AdminUserList() {
  const [users, setUsers] = useState({});
  const [userMap, setUserMap] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUsers() {
      // Получаем все practice_submissions
      const snapPractices = await getDocs(collection(db, "practice_submissions"));
      // Получаем все task_submissions
      const snapTasks = await getDocs(collection(db, "task_submissions"));
      // Получаем всех пользователей из коллекции users
      const snapUsers = await getDocs(collection(db, "users"));

      const userMapTemp = {};
      snapUsers.docs.forEach(doc => {
        const data = doc.data();
        const nickname = data.nickname;
        const firstName = data.firstName;
        userMapTemp[doc.id] = nickname || firstName || doc.id;
      });
      setUserMap(userMapTemp);

      const usersObj = {};

      // Считаем практики на проверку
      snapPractices.docs.forEach(doc => {
        const { userId, status } = doc.data();
        if (!userId) return;
        if (!usersObj[userId]) {
          usersObj[userId] = { practiceCount: 0, taskCount: 0 };
        }
        if (status === "pending" || status === "submitted") {
          usersObj[userId].practiceCount += 1;
        }
      });

      // Считаем задания на проверку
      snapTasks.docs.forEach(doc => {
        const { userId, status } = doc.data();
        if (!userId) return;
        if (!usersObj[userId]) {
          usersObj[userId] = { practiceCount: 0, taskCount: 0 };
        }
        if (status === "pending" || status === "submitted") {
          usersObj[userId].taskCount += 1;
        }
      });

      setUsers(usersObj);
    }
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-[#191A1D] p-8 text-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">Пользователи с практиками и заданиями</h2>
        <table className="min-w-full bg-[#232427] rounded-md shadow-md overflow-hidden">
          <thead>
            <tr className="text-left text-gray-300 border-b border-gray-700">
              <th className="px-6 py-3">Пользователь</th>
              <th className="px-6 py-3">Количество практик</th>
              <th className="px-6 py-3">Количество заданий</th>
              <th className="px-6 py-3">Действия</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(users).length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center text-gray-400 py-4">
                  Нет пользователей
                </td>
              </tr>
            ) : (
              Object.entries(users)
                .slice()
                .sort(([, a], [, b]) => {
                  // Пользователи с практиками/заданиями на проверку (practiceCount > 0 или taskCount > 0) идут выше
                  const aHasPending = a.practiceCount > 0 || a.taskCount > 0;
                  const bHasPending = b.practiceCount > 0 || b.taskCount > 0;
                  if (aHasPending === bHasPending) return 0;
                  return aHasPending ? -1 : 1;
                })
                .map(([uid, { practiceCount, taskCount }]) => (
                  <tr key={uid} className="border-b border-gray-700 hover:bg-[#2c2f33]">
                    <td className="px-6 py-4">{userMap[uid] ? userMap[uid] : uid}</td>
                    <td className="px-6 py-4">
                      {practiceCount === 0 ? "Нет практик на проверку" : practiceCount}
                    </td>
                    <td className="px-6 py-4">
                      {taskCount === 0 ? "Нет заданий на проверку" : taskCount}
                    </td>
                    <td className="px-6 py-4 space-x-2">
                      <button
                        className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded transition"
                        onClick={() => navigate(`/admin/user/${uid}/practices`)}
                      >
                        Практики
                      </button>
                      <button
                        className="bg-purple-600 hover:bg-purple-500 text-white px-3 py-1 rounded transition"
                        onClick={() => navigate(`/admin/user/${uid}/tasks`)}
                      >
                        Задания
                      </button>
                    </td>
                  </tr>
                ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
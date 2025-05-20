import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import CertificatePDF from "./CertificatePDF";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";

const CertificatePage = () => {
  const [userName, setUserName] = useState(" ");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const snap = await getDoc(userRef);
        if (snap.exists()) {
          const data = snap.data();
          setUserName(`${data.lastName || ""} ${data.firstName || ""}`.trim());

          // Проверяем, есть ли дата сертификата
          let certificateDate = data.certificateDate;
          if (!certificateDate) {
            // Если нет — ставим сегодняшнюю, сохраняем в Firestore
            certificateDate = new Date().toLocaleDateString("ru-RU");
            await updateDoc(userRef, { certificateDate });
          }
          setDate(certificateDate);
        }
      }
      setLoading(false);
    };
    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className="bg-[#2B2B31] p-6 rounded-2xl flex flex-col items-center min-h-[500px]">
        <h2 className="text-3xl font-bold mb-6">Сертификат</h2>
        <div className="text-white/80">Загрузка данных...</div>
      </div>
    );
  }

  return (
    <div className="bg-[#2B2B31] p-6 rounded-2xl flex flex-col items-center min-h-[500px]">
      <h2 className="text-3xl font-bold mb-6">Сертификат</h2>
      <div className="w-full flex justify-center mb-6" style={{ minHeight: 420 }}>
        <PDFViewer width="900" height="420" className="rounded-xl border border-yellow-300 shadow-2xl">
          <CertificatePDF userName={userName} date={date} />
        </PDFViewer>
      </div>
      <PDFDownloadLink
        document={<CertificatePDF userName={userName} date={date} />}
        fileName={`Сертификат_ClipLab_${userName.replace(" ", "_")}.pdf`}
        className="bg-yellow-400 text-black px-6 py-3 rounded-full font-semibold hover:bg-yellow-500 transition mt-2"
      >
        Скачать сертификат
      </PDFDownloadLink>
    </div>
  );
};

export default CertificatePage;
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";

// Основные страницы
import MainPage from "./components/MainPage/MainPage.jsx";
import CoursesPage from "./components/CoursesPage/CoursesPage.jsx";
import CourseFinalCut from "./components/CourseFinalCut/CourseFinalCut";
import LoginPage from "./components/Auth/LoginPage";
import RegisterPage from "./components/Auth/RegisterPage";
import ProfilePage from "./components/Profile/ProfilePage";
import ProfileCourses from "./components/Profile/ProfileCourses";
import ProfileProgress from "./components/Profile/ProfileProgress";
import ProfileSettings from "./components/Profile/ProfileSettings";
import AdminPracticeSubmissions from "./components/Admin/AdminPracticeSubmissions.jsx";
import AdminUserList from "./components/Admin/AdminUserList.jsx";
import AdminAuth from "./components/Admin/AdminAuth.jsx";
import AdminTaskSubmissions from "./components/Admin/AdminTaskSubmissions.jsx";

import RequireAuth from "./components/Auth/RequireAuth";

import "./index.css";
import { UserProvider } from "./context/UserContext";
import FCPXZeroPage from "./components/Courses/FinalCutProXZero/FCPXZeroPage";
import KnowledgeBasePage from "./components/KnowledgeBasePage/KnowledgeBasePage.jsx";
import ForumPage from "./components/ForumPage/ForumPage.jsx";
import ChallengesPage from "./components/ChallengesPage/ChallengesPage.jsx";

import MontageTheory from "./components/CoursesInDevelopment/MontageTheory.jsx";
import MobileMontage from "./components/CoursesInDevelopment/MobileMontage.jsx";
import DaVinciResolveZero from "./components/CoursesInDevelopment/DaVinciResolveZero.jsx";
import PremiereProZero from "./components/CoursesInDevelopment/PremiereProZero.jsx";
import AiVideomaking from "./components/CoursesInDevelopment/AiVideomaking.jsx";
import DaVinciResolveColorCorrection from "./components/CoursesInDevelopment/DaVinciResolveColorCorrection.jsx";
import FCPXPro from "./components/CoursesInDevelopment/FCPXPro.jsx";
import DaVinciResolvePro from "./components/CoursesInDevelopment/DaVinciResolvePro.jsx";
import PremiereProPro from "./components/CoursesInDevelopment/PremiereProPro.jsx";
import FilmEditing from "./components/CoursesInDevelopment/FilmEditing.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/courses/final-cut" element={<CourseFinalCut />} />
          <Route path="/courses/montage-theory" element={<MontageTheory />} />
          <Route path="/courses/mobile-montage" element={<MobileMontage />} />
          <Route path="/courses/davinciresolve-zero" element={<DaVinciResolveZero />} />
          <Route path="/courses/premierepro-zero" element={<PremiereProZero />} />
          <Route path="/courses/ai-videomaking" element={<AiVideomaking />} />
          <Route path="/courses/davinciresolve-colorcorrection" element={<DaVinciResolveColorCorrection />} />
          <Route path="/courses/fcpx-pro" element={<FCPXPro />} />
          <Route path="/courses/davinciresolve-pro" element={<DaVinciResolvePro />} />
          <Route path="/courses/premierepro-pro" element={<PremiereProPro />} />
          <Route path="/courses/filmediting" element={<FilmEditing />} />
          <Route path="/courses/fcpx-zero" element={<RequireAuth><FCPXZeroPage /></RequireAuth>}>
            <Route index element={<FCPXZeroPage />} />
            <Route path="lesson/:lessonId" element={<FCPXZeroPage />} />
            <Route path="practice/:practiceId" element={<FCPXZeroPage />} />
            <Route path="quiz/:quizId" element={<FCPXZeroPage />} />
            <Route path="task/:taskId" element={<FCPXZeroPage />} />
            <Route path="summary" element={<FCPXZeroPage />} />
            <Route path="achievements" element={<FCPXZeroPage />} />
            <Route path="certificate" element={<FCPXZeroPage />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<RequireAuth><ProfilePage /></RequireAuth>}>
            <Route index element={<ProfileProgress />} />
            <Route path="mycourses" element={<ProfileCourses />} />
            <Route path="settings" element={<ProfileSettings />} />
          </Route>
          
          <Route
            path="/admin"
            element={
              <AdminAuth>
                <AdminUserList />
              </AdminAuth>
            }
          />
          <Route
            path="/admin/user/:userId/practices"
            element={
              <AdminAuth>
                <AdminPracticeSubmissions />
              </AdminAuth>
            }
          />
          <Route
            path="/admin/user/:userId"
            element={
              <AdminAuth>
                <AdminPracticeSubmissions />
              </AdminAuth>
            }
          />
          <Route
            path="/admin/user/:userId/tasks"
            element={
              <AdminAuth>
                <AdminTaskSubmissions />
              </AdminAuth>
            }
          />
          <Route path="/knowledge" element={<KnowledgeBasePage />} />
          <Route path="/forum" element={<ForumPage />} />
          <Route path="/challenges" element={<ChallengesPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  </React.StrictMode>
);
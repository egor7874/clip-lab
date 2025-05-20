// src/components/MainPage/MainPage.jsx
import React from "react";
import Hero from "./Hero";
import Features from "./Features";
import Courses from "./Courses";
import Tips from "./Tips";
import ForumPreview from "./ForumPreview";
import Header from "../Header";
import Footer from "../Footer";

export default function MainPage() {
  return (
    <>
      <Header />
      <Hero />
      <Features />
      <Courses />
      <Tips />
      <ForumPreview />
      <Footer />
    </>
  );
}
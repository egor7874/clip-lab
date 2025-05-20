import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CourseFinalCutHero from "./CourseFinalCutHero";
import CourseFinalCutAbout from "./CourseFinalCutAbout";
import CourseFinalCutProgram from "./CourseFinalCutProgram";
import CourseFinalCutHow from "./CourseFinalCutHow";
import CourseFinalCutFAQ from "./CourseFinalCutFAQ";
import CourseFinalCutTestBanner from "./CourseFinalCutTestBanner";

export default function CourseFinalCut() {
  return (
    <>
      <Header />
      <div className="w-full h-[15px] bg-[#212123]" />

      <main className="bg-[#212123] text-white font-inter min-h-screen">
        <CourseFinalCutHero />
        <CourseFinalCutAbout />
        <CourseFinalCutProgram />
        <CourseFinalCutHow />
        <CourseFinalCutFAQ />
        <CourseFinalCutTestBanner />
      </main>
      <Footer />
    </>
  );
}
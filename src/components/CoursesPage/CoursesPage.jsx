import CoursesHero from "./CoursesHero";
import CoursesInteractive from "./CoursesInteractive";
import CoursesOurcourses from "./CoursesOurcourses";
import CoursesTestBanner from "./CoursesTestBanner";
import CoursesFAQ from "./CoursesFAQ";

import Header from "../Header";
import Footer from "../Footer";

export default function CoursesPage() {
  return (
    <div className="bg-dark text-white">
      <Header />
      <CoursesHero />
      <CoursesInteractive />
      <CoursesOurcourses />
      <CoursesTestBanner />
      <CoursesFAQ />
      <Footer />
    </div>
  );
}
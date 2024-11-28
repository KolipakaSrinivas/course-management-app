import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "../src/components/Header";
import Footer from "./components/Footer";

// Lazy-loaded components/pages
const Home = React.lazy(() => import("./pages/Home"));
const CoursesPage = React.lazy(() => import("./pages/CoursesPage"));
const CoursesTypePage = React.lazy(() => import("./pages/CoursesTypePage"));
const StudentRegistrationsPage = React.lazy(() =>
  import("./pages/StudentRegistrationsPage")
);
const CombineCoursesTypesPage = React.lazy(() =>
  import("./pages/combine-courses-types-page")
);

function App() {
  // Reset localStorage
  // const resetLocalStorage = () => {
  //   localStorage.removeItem("students");
  //   localStorage.removeItem("course-types");
  //   localStorage.removeItem("combinedCourses");
  //   localStorage.removeItem("courses");
  // };

  // Uncomment during development if needed
  // resetLocalStorage();

  return (
    <main className="text-black bg-slate-300 dark:text-white dark:bg-black flex flex-col justify-between min-h-screen">
      <Header />
      {/* Suspense wraps routes to show a fallback while loading */}
      <Suspense fallback={<div className="text-center p-4">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/courses-types" element={<CoursesTypePage />} />
          <Route
            path="/student-registrations"
            element={<StudentRegistrationsPage />}
          />
          <Route
            path="/combine-courses-and-types"
            element={<CombineCoursesTypesPage />}
          />
        </Routes>
      </Suspense>
      <Footer />
    </main>
  );
}

export default App;

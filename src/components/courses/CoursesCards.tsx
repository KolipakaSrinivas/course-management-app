import { useState } from "react";
import CourseUpdateModel from "./CourseUpdateModel";
import { CourseTypeScript } from "../../TypeScript";

const CoursesCards = ({
  course,
  setCoursesData
}: {
  course: CourseTypeScript;
  setCoursesData: React.Dispatch<React.SetStateAction<CourseTypeScript[]>>;
}) => {
  const truncatedDescription = course?.description
    .split(" ")
    .slice(0, 12)
    .join("\n");
  const [toggleModal, setToggleModal] = useState(false);

  const deleteCourse = () => {
    try {
      const storedData = localStorage.getItem("courses");
      const courses: CourseTypeScript[] = storedData
        ? JSON.parse(storedData)
        : [];

      // Filter out the course with the matching id
      const updatedCourses: CourseTypeScript[] = courses.filter(
        (c) => c.id !== course.id
      );

      // Update localStorage and state
      localStorage.setItem("courses", JSON.stringify(updatedCourses));
      setCoursesData(updatedCourses); // Ensure setCoursesData expects CourseTypeScript[]
      setToggleModal(false);
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  return (
    <div className="max-w-[21rem] p-5 mt-5 bg-slate-400 border  border-gray-200 rounded-lg shadow dark:bg-black dark:border-gray-700 flex flex-col justify-between">
      <a href="#">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {course.name}
        </h5>
      </a>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
        {truncatedDescription} {""}
        <span className="text-blue-700 font-bold">More</span>
      </p>
      <div className="flex gap-1">
        <button
          onClick={deleteCourse}
          type="button"
          className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Delete
        </button>
        <button
          type="button"
          onClick={() => setToggleModal(true)}
          className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Update
        </button>
      </div>
      {toggleModal && (
        <CourseUpdateModel
          setCoursesData={setCoursesData}
          course={course}
          setToggleModal={setToggleModal}
        />
      )}
    </div>
  );
};

export default CoursesCards;

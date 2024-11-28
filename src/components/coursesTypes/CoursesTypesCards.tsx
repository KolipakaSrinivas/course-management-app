import { useState } from "react";
import UpdateModelform from "./UpdateModelform";
import { CourseTypesTypeScript } from "../../TypeScript";

interface ChildProps {
  courseType: CourseTypesTypeScript;
  setCoursesTypesData: React.Dispatch<
    React.SetStateAction<CourseTypesTypeScript[]>
  >;
}

const CoursesTypesCards: React.FC<ChildProps> = ({
  courseType,
  setCoursesTypesData
}) => {
  const [toggleModal, setToggleModal] = useState(false);

  const deleteCourse = () => {
    try {
      const storedData = localStorage.getItem("course-types");
      const courseTypes: CourseTypesTypeScript[] = storedData
        ? JSON.parse(storedData)
        : [];

      // Filter out the course with the matching id
      const updatedCourseTypes: CourseTypesTypeScript[] = courseTypes.filter(
        (c) => c.id !== courseType.id
      );

      // Update localStorage and state
      localStorage.setItem("course-types", JSON.stringify(updatedCourseTypes));
      setCoursesTypesData(updatedCourseTypes);
      setToggleModal(false);

      console.log("Deleted course with id:", courseType.id);
      console.log("Updated course list:", updatedCourseTypes);
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  const trackDescription = courseType.description
    .split(" ")
    .slice(0, 12)
    .join(" ");

  return (
    <div className="max-w-[21rem] p-5 bg-slate-400 border  border-gray-200 rounded-lg shadow dark:bg-black dark:border-gray-700 flex flex-col justify-between">
      <a href="#">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {courseType.name}
        </h5>
      </a>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
        {trackDescription} <span className="text-blue-700 font-bold">More</span>
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
          onClick={() => setToggleModal(true)}
          type="button"
          className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Update
        </button>
      </div>
      {toggleModal && (
        <UpdateModelform
          setCoursesTypesData={setCoursesTypesData}
          setToggleModal={setToggleModal}
          courseType={courseType}
        />
      )}
    </div>
  );
};

export default CoursesTypesCards;

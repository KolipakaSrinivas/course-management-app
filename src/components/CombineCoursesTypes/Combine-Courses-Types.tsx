import { useState } from "react";
import { TbFilterCheck } from "react-icons/tb";
import { useLocalStorageData } from "../../utils/useLocalStorageData";
import {
  CourseTypesTypeScript,
  CourseTypeScript,
  CombinedCoursesTypeScript
} from "../../TypeScript";
import { courses, courseTypes, combinedCourses } from "../../data/data";
import ResubleDropDwonButton from "./ResubleDropDwonButton";

const CombineCoursesTypes = () => {
  const [toggleDropDwonOne, setToggleDropOne] = useState<boolean>(false);
  const [toggleDropDwonTwo, setToggleDropTwo] = useState<boolean>(false);

  const [coursesData] = useLocalStorageData<CourseTypeScript[]>(
    "courses",
    courses
  );
  const [coursesTypesData] = useLocalStorageData<CourseTypesTypeScript[]>(
    "course-types",
    courseTypes
  );
  const [data, setData] = useLocalStorageData<CombinedCoursesTypeScript[]>(
    "combinedCourses",
    combinedCourses
  );

  const [selectCourse, setSelectCourses] = useState("Course Types");
  const [selectCourseType, setSelectCoursesType] = useState("Course");

  const CreateCourse = () => {
    if (!data) return;

    const courseExists = data.some(
      (item) => selectCourse === item.course && selectCourseType === item.type
    );

    if (
      courseExists ||
      selectCourse == "Course Types" ||
      selectCourseType == "Course"
    ) {
      console.log("Not created");
      alert("Course already exists! Please add a different course.");
    } else {
      const newCourse = {
        id: data.length + 1,
        course: selectCourse,
        type: selectCourseType
      };

      alert("Course Created");
      const updatedData = [...data, newCourse];
      setData(updatedData);
      localStorage.setItem("combinedCourses", JSON.stringify(updatedData));
      console.log("Course added successfully!");
    }
  };

  const deleteCourse = (id: number) => {
    try {
      const storedData = localStorage.getItem("combinedCourses");
      const combinedCourses: CombinedCoursesTypeScript[] = storedData
        ? JSON.parse(storedData)
        : [];

      // Filter out the course with the matching id
      const updatedcombinedCourses: CombinedCoursesTypeScript[] =
        combinedCourses.filter((c) => c.id !== id);

      // Update localStorage and state
      localStorage.setItem(
        "course-types",
        JSON.stringify(updatedcombinedCourses)
      );
      setData(updatedcombinedCourses);
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  return (
    <div className="flex justify-center flex-col gap-10">
      {/* Buttons Section */}
      <div className="relative flex justify-center gap-5">
        {/* Dropdown Button 1 */}
        <div>
          <button
            onClick={() => setToggleDropOne(!toggleDropDwonOne)}
            className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-slate-300 dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 flex items-center">
              {selectCourse}
              <svg
                className="w-2.5 h-2.5 ms-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </span>
          </button>

          <ResubleDropDwonButton
            setValue={setSelectCourses}
            toggleModal={toggleDropDwonOne}
            setToggleModal={setToggleDropOne}
            data={coursesData || []}
          />
        </div>

        {/* Dropdown Button 2 */}
        <div>
          <button
            onClick={() => setToggleDropTwo(!toggleDropDwonTwo)}
            className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-slate-300 dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 flex items-center">
              {selectCourseType}
              <svg
                className="w-2.5 h-2.5 ms-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </span>
          </button>

          <ResubleDropDwonButton
            toggleModal={toggleDropDwonTwo}
            setToggleModal={setToggleDropTwo}
            data={coursesTypesData || []}
            setValue={setSelectCoursesType}
          />
        </div>

        {/* Create Course Button */}
        <div>
          <button
            type="button"
            onClick={CreateCourse}
            className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-slate-300 dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Create Course
            </span>
          </button>
        </div>

        {/* Filter Button */}
        <div className="ml-auto">
          <button
            type="button"
            className="hover:text-slate-400"
            onClick={CreateCourse}
          >
            <TbFilterCheck size={30} />
          </button>
        </div>
      </div>

      {/* Courses List Section */}
      <div className="flex flex-wrap  gap-2 justify-evenly">
        {data.map((course) => {
          return (
            <div
              key={course.id}
              className="max-w-sm p-6 bg-slate-400 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
            >
              <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {course.course}
                </h5>
              </a>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {course.type}
              </p>
              <button
                onClick={() => deleteCourse(course.id)}
                type="button"
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-500 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Delete
                <svg
                  className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CombineCoursesTypes;

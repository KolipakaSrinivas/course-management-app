import { useState } from "react";
import CoursesCards from "./CoursesCards";
import { courses } from "../../data/data";
import CourseCreateModel from "./CourseCreateModel";
import { useLocalStorageData } from "../../utils/useLocalStorageData";
import { CourseTypeScript } from "../../TypeScript";

const Courses = () => {
  const [toggleModal, setToggleModal] = useState(false);
  const [formData, setFormData] = useState<CourseTypeScript>({
    id: 0,
    name: "",
    description: ""
  });

  const [coursesData, setCoursesData] = useLocalStorageData<CourseTypeScript[]>(
    "courses",
    courses
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTextAreaChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (): void => {
    if (!formData.name.trim() || !formData.description.trim()) {
      alert("Please fill out all the fields.");
      return;
    }

    const newCourseData: CourseTypeScript = {
      ...formData,
      id: (coursesData?.length || 0) + 1 // Ensure id is correctly assigned
    };

    const updatedData: CourseTypeScript[] = coursesData
      ? [...coursesData, newCourseData]
      : [newCourseData];

    setCoursesData(updatedData);
    setFormData({
      id: 0,
      name: "",
      description: ""
    }); // Reset form
    setToggleModal(false);
    localStorage.setItem("courses", JSON.stringify(updatedData));
  };

  return (
    <div>
      <h1 className="mb-4 text-4xl  font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Available{" "}
        <span className="text-blue-600 dark:text-blue-500">Courses.</span>
      </h1>
      <p className="text-lg lg:w-[60vw] font-normal text-gray-500 lg:text-xl dark:text-gray-400 mb-6">
        Explore a wide range of courses designed to help you achieve your
        learning goals. From languages to specialized topics, we have something
        for everyone.
      </p>
      <div>
        <button
          type="button"
          onClick={() => setToggleModal(true)}
          className="relative px-5 py-3 inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
        >
          Add Course
        </button>
      </div>
      <div className="flex flex-wrap gap-2 justify-center">
        {coursesData &&
          coursesData.map((course) => {
            return (
              <CoursesCards
                key={course.id}
                course={course}
                setCoursesData={setCoursesData}
              />
            );
          })}
      </div>
      {toggleModal && (
        <CourseCreateModel
          setToggleModal={setToggleModal}
          formData={formData}
          handleTextAreaChange={handleTextAreaChange}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default Courses;

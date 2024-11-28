import { useState } from "react";
import CoursesTypesCards from "./CoursesTypesCards";
import CreateModelFomr from "./CreateModelFomr";
import { courseTypes } from "../../data/data";
import { useLocalStorageData } from "../../utils/useLocalStorageData";
import { CourseTypesTypeScript } from "../../TypeScript";

const CoursesType = () => {
  const [toggleModal, setToggleModal] = useState(false);
  const [formData, setFormData] = useState<CourseTypesTypeScript>({
    id: 0,
    name: "",
    description: ""
  });
  const [coursesTypesData, setCoursesTypesData] = useLocalStorageData<
    CourseTypesTypeScript[]
  >("course-types", courseTypes);

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTextAreaChange: React.ChangeEventHandler<HTMLTextAreaElement> = (
    e
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (): void => {
    const id: number = (coursesTypesData?.length || 0) + 1;
    const newFormData: CourseTypesTypeScript = { ...formData, id };
    const updatedData = coursesTypesData
      ? [...coursesTypesData, newFormData]
      : [newFormData];

    // Validate the form fields
    if (!formData.name.trim() || !formData.description.trim()) {
      alert("Please fill out all the fields.");
      return;
    }

    // Update state and reset the form
    setCoursesTypesData(updatedData);
    setFormData({
      id: 0,
      name: "",
      description: ""
    });

    setToggleModal(false);
    localStorage.setItem("course-types", JSON.stringify(updatedData));
  };

  return (
    <div>
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Available{" "}
        <span className="text-blue-600 dark:text-blue-500">Courses</span> <br />
        Types.
      </h1>
      <p className="text-lg lg:w-[60vw] font-normal text-gray-500 lg:text-xl dark:text-gray-400 mb-6">
        Explore a wide range of courses Types designed to help you achieve your
        learning goals. From languages to specialized topics, we have something
        for everyone.
      </p>
      <div>
        <button
          type="button"
          onClick={() => setToggleModal(true)}
          className="relative px-5 py-3  inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
        >
          Add Course
        </button>
      </div>
      <div className="flex flex-wrap gap-2 lg:justify-startr mt-5">
        {coursesTypesData &&
          coursesTypesData.map((courseType) => {
            return (
              <CoursesTypesCards
                key={courseType.id}
                courseType={courseType}
                setCoursesTypesData={setCoursesTypesData}
              />
            );
          })}
      </div>
      {toggleModal && (
        <CreateModelFomr
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

export default CoursesType;

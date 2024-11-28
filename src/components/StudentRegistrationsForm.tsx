import { useState, ChangeEvent, FormEvent } from "react";
import { useLocalStorageData } from "../utils/useLocalStorageData";
import { StudentRegistrationss, combinedCourses } from "../data/data";
import { StudentTypeScript, CombinedCoursesTypeScript } from "../TypeScript";
import { useNavigate } from "react-router-dom";

const StudentRegistrationsForm = () => {
  const navigate = useNavigate();

  // Initial state structure for the form
  const initialState: StudentTypeScript = {
    id: 0,
    firstName: "",
    lastName: "",
    phone: "",
    collage: "",
    feeAmount: "",
    paymentStatus: "",
    email: "",
    selectedCourse: "",
    notes: "",
    createdAt: ""
  };

  // State to manage form data
  const [formData, setFormData] = useState<StudentTypeScript>(initialState);

  // State to manage error flags for input fields
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  // Fetch students and course data from localStorage (or fallback to provided data)
  const [Students] = useLocalStorageData<StudentTypeScript[]>(
    "students",
    StudentRegistrationss
  );

  const [combinedCoursesData] = useLocalStorageData<
    CombinedCoursesTypeScript[] | null
  >("combinedCourses", combinedCourses);

  // Update form state on input change and reset the respective error
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    setErrors((prev) => ({ ...prev, [name]: false })); // Clear error for the field
  };

  // Email validation using regex
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Phone number validation (10 digits)
  const phoneRegex = /^[0-9]{10}$/;

  // Form submission handler
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Validate email format
    if (!isValidEmail(formData.email) && formData.email.length > 0) {
      alert("Please enter a valid email address.");
      return; // Stop submission if invalid
    }

    // Validate phone format
    if (!phoneRegex.test(formData.phone) && formData.phone.length > 1) {
      alert("Please enter a valid 10-digit phone number.");
      return; // Stop submission if invalid
    }

    // Validate if all fields are filled
    const newErrors: Record<string, boolean> = {};
    Object.keys(formData).forEach((key) => {
      const formKey = key as keyof typeof formData;
      if (!formData[formKey]?.toString().trim()) {
        newErrors[formKey] = true;
      }
    });

    if (Object.keys(newErrors).length > 1) {
      alert("Please fill out all the fields.");
      setErrors(newErrors); // Highlight missing fields
      return; // Stop submission if invalid
    }

    // Create a new student entry with a unique ID
    const newStudent = {
      ...formData,
      id: (Students?.length || 0) + 1,
      createdAt: new Date().toISOString()
    };

    // Save the new student entry to localStorage
    const updatedStudents = Students ? [...Students, newStudent] : [newStudent];
    localStorage.setItem("students", JSON.stringify(updatedStudents));

    // Reset form state and show success message
    setFormData(initialState);
    alert("Form submitted successfully!");
    navigate("/"); // Redirect after submission
  };
  return (
    <form className="max-w-md mx-auto ">
      <div className="grid md:grid-cols-2 md:gap-6">
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="firstName"
            id="floating_first_name"
            className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 ${
              errors.firstName ? "border-red-400" : "border-white"
            } appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
            placeholder=" "
            onChange={handleChange}
            value={formData.firstName}
            required
          />

          <label
            htmlFor="floating_first_name"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            First name
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="lastName"
            id="floating_last_name"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-white appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange(e)
            }
            value={formData.lastName}
            required
          />
          <label
            htmlFor="floating_last_name"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Last name
          </label>
        </div>
      </div>
      <div className="grid md:grid-cols-2 md:gap-6">
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="tel"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            name="phone"
            id="phone"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-white appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            onChange={handleChange}
            value={formData.phone}
            required
          />
          <label
            htmlFor="floating_phone"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Phone number
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="collage"
            id="floating_company"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-white appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
            onChange={handleChange}
            value={formData.collage}
          />
          <label
            htmlFor="floating_company"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Collage
          </label>
        </div>
      </div>
      <div className="grid md:grid-cols-2 md:gap-6">
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="number"
            name="feeAmount"
            id="floating_first_name"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-white appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
            onChange={handleChange}
            value={formData.feeAmount}
          />
          <label
            htmlFor="floating_first_name"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Fee Amount
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <select
            name="paymentStatus"
            id="floating_last_name"
            className="block py-2.5 px-0 w-full text-sm dark:bg-black text-gray-900 bg-transparent border-0 border-b-2 border-white appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            required
            value={formData.paymentStatus}
            onChange={handleChange}
          >
            <option selected disabled>
              Payment Status
            </option>
            <option value="Pending">Pending</option>
            <option value="Paid">Paid</option>
            <option value="due">Due</option>
          </select>
        </div>
      </div>
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="email"
          name="email"
          id="floating_email"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-white appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
          value={formData.email}
          onChange={handleChange}
        />
        <label
          htmlFor="floating_email"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Email address
        </label>
      </div>
      <div className="relative z-0 w-full mb-5 group">
        <select
          name="selectedCourse"
          value={formData.selectedCourse}
          onChange={handleChange}
          id="selectedCourse"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-white dark:bg-black appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        >
          <option selected disabled>
            Selected Course
          </option>

          {combinedCoursesData &&
            combinedCoursesData.map((course) => {
              const value = `${course.course},${course.type}`;
              return (
                <option key={course.id} value={value}>
                  {value}
                </option>
              );
            })}
        </select>
      </div>

      <label
        htmlFor="message"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Notes
      </label>
      <textarea
        id=""
        name="notes"
        value={formData.notes}
        rows={4}
        onChange={handleChange}
        className="block my-3 p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-black dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Write your Notes here..."
      />

      <button
        onClick={handleSubmit}
        type="button"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Submit
      </button>
    </form>
  );
};

export default StudentRegistrationsForm;

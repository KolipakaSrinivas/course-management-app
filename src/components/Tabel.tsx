import { useState } from "react";
import { Link } from "react-router-dom";
import PaginationComponent from "./PaginationComponent";
import { StudentRegistrationss } from "../data/data";
import { StudentTypeScript } from "../TypeScript";
import { useLocalStorageData } from "../utils/useLocalStorageData";

const Table = () => {
  const [Students] = useLocalStorageData<StudentTypeScript[]>(
    "students",
    StudentRegistrationss
  );

  const [qurey, setQurey] = useState("");

  const qureySearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setQurey(value);
  };

  // Filter the students based on the search query
  const filteredStudents = Students.filter((student) => {
    const searchLower = qurey.toLowerCase(); // Convert the query to lowercase for case-insensitive search
    return (
      student.firstName.toLowerCase().includes(searchLower) ||
      student.lastName.toLowerCase().includes(searchLower) ||
      student.selectedCourse.toLowerCase().includes(searchLower)
    );
  });

  // Pagination logic
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems =
    Students && Students.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil((Students?.length || 0) / itemsPerPage);

  const onPageChange = (page: number) => setCurrentPage(page);

  const filteredStudentsData =
    filteredStudents.length !== Students.length
      ? filteredStudents
      : currentItems;

  console.log(filteredStudentsData);

  return (
    <div className="relative overflow-x-auto  sm:rounded-lg my-[5rem] lg:w-[55vw] shadow-lg">
      <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4 ">
        <label htmlFor="table-search" className="sr-only">
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <input
            type="text"
            name="qurey"
            id="table-search"
            onChange={qureySearch}
            value={qurey}
            className="block p-2 ps-10 text-sm text-gray-900  border-2 border-gray-500 rounded-lg w-80 bg-slate-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search for items"
          />
        </div>
        <Link
          to="/student-registrations"
          className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none "
        >
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-slate-400 text-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Registe a Student
          </span>
        </Link>
      </div>
      <table className="w-full text-sm text-left rtl:text-right bg-slate-300 text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-slate-400 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              student Name
            </th>
            <th scope="col" className="px-6 py-3">
              course
            </th>
            <th scope="col" className="px-6 py-3">
              Payment Status
            </th>
            <th scope="col" className="px-6 py-3">
              Date
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {currentItems &&
            currentItems.map((student) => (
              <tr
                key={student.id}
                className="bg-slate-300 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {student.firstName} {student.lastName}
                </th>
                <td className="px-6 py-4">{student.selectedCourse}</td>
                <td className="px-6 py-4">{student.paymentStatus}</td>
                <td className="px-6 py-4">
                  {new Date(student.createdAt).toLocaleString("default", {
                    year: "numeric",
                    month: "numeric", // Full month name, e.g., "November"
                    day: "numeric"
                  })}
                </td>
                <td className="px-6 py-4">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </a>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <PaginationComponent
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default Table;

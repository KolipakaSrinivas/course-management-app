import { useState, useEffect } from "react";
import { MdDarkMode } from "react-icons/md";
import { FiSun } from "react-icons/fi";
import { SiConcourse } from "react-icons/si";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Set the theme based on localStorage or OS preference on initial load
  useEffect(() => {
    const userTheme = localStorage.getItem("theme");
    const systemTheme = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (userTheme === "dark" || (!userTheme && systemTheme)) {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDarkMode(false);
    }
  }, []);

  // Toggle theme mode
  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDarkMode(true);
    }
  };

  // Helper function to determine if a link is active
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-slate-300 border-gray-200 dark:bg-black px-[2rem] lg:px-0">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-around lg:px-[6rem] py-5">
        <Link
          to="/"
          className="self-center text-2xl font-mono text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-blue-500 whitespace-nowrap flex items-center gap-2"
        >
          <SiConcourse className="text-blue-500 font-extrabold" size={35} />
          Skill Path
        </Link>
        {isDarkMode ? (
          <FiSun
            onClick={toggleTheme}
            className="ml-auto mr-4 cursor-pointer"
            size={22}
          />
        ) : (
          <MdDarkMode
            onClick={toggleTheme}
            className="ml-auto mr-4 cursor-pointer"
            size={22}
          />
        )}
        <button
          onClick={toggleMenu}
          type="button"
          className="inline-flex z-30 items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded={menuOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          className={`${
            menuOpen ? "block absolute top-10 z-20 " : "hidden"
          } w-full md:block md:w-auto`}
        >
          <ul
            className={`font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-slate-300 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-slate-300 dark:bg-black md:dark:bg-black dark:border-gray-700`}
          >
            <li>
              <Link
                to="/"
                className={`block py-2 px-3 rounded md:p-0 ${
                  isActive("/") ? "text-blue-700 dark:text-blue-500" : "text-gray-900 dark:text-white"
                }`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/courses"
                className={`block py-2 px-3 rounded md:p-0 ${
                  isActive("/courses")
                    ? "text-blue-700 dark:text-blue-500"
                    : "text-gray-900 dark:text-white"
                }`}
              >
                Courses
              </Link>
            </li>
            <li>
              <Link
                to="/courses-types"
                className={`block py-2 px-3 rounded md:p-0 ${
                  isActive("/courses-types")
                    ? "text-blue-700 dark:text-blue-500"
                    : "text-gray-900 dark:text-white"
                }`}
              >
                CoursesTypes
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;

import { Link } from "react-router-dom";
import { GrUpdate } from "react-icons/gr";

const NotFound = () => {
  return (
    <div className="lg:px-[6rem] py-[4.5rem] flex flex-col gap-5 px-[2rem] items-center justify-center text-center">
      <h1 className="text-5xl font-extrabold text-gray-900 dark:text-red-500">
        Page Not Found <span className="text-sm text-red-400">404</span>
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300">
        Sorry, the page you are looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition duration-200"
        title="Go back to the homepage"
      >
        <GrUpdate size={30} />
        <span className="text-lg font-medium">Back to Home</span>
      </Link>
    </div>
  );
};

export default NotFound;

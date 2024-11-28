import { Pagination } from "flowbite-react";

function PaginationComponent({
  totalPages,
  currentPage,
  onPageChange
}: {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}) {
  return (
    <div className="flex items-end justify-end overflow-x-auto m-2  ">
      <span className="text-sm font-normal text-gray-500 dark:text-gray-400 my-2 ml-2 ">
        Showing{" "}
        <span className="font-semibold text-gray-900 dark:text-white mx-2 ">
          {currentPage}
        </span>{" "}
        of{" "}
        <span className="font-semibold text-gray-900 dark:text-white ml-2">
          {totalPages}
        </span>
      </span>
      <Pagination
        className="ml-auto"
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
}

export default PaginationComponent;

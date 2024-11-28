import { CourseTypesTypeScript, CourseTypeScript } from "../../TypeScript";

const ResubleDropDwonButton = ({
  toggleModal,
  data,
  setToggleModal,
  setValue
}: {
  toggleModal: boolean;
  data: CourseTypesTypeScript[] | CourseTypeScript[] | null;
  setToggleModal: React.Dispatch<React.SetStateAction<boolean>>;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const handelClick = (name: string): void => {
    setValue(name);
    setToggleModal(false);
  };
  return (
    <div
      className={`z-10 ${
        !toggleModal ? "hidden" : "" // Toggle visibility based on state
      } bg-white absolute top-14  divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 `}
    >
      <ul
        className="py-2 text-sm text-gray-700 dark:text-gray-200"
        aria-labelledby="dropdownHoverButton"
        onMouseLeave={() => setToggleModal(false)}
      >
        {data &&
          data.map((item) => {
            return (
              <li
                onClick={() => handelClick(item.name)}
                key={item.id}
                className="block cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                {item.name}
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default ResubleDropDwonButton;

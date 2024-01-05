import { Link } from "react-router-dom";

const SidebarItems = ({ icons, text, role, to, className, hover, onClick }) => {
  return (
    <Link to={to}>
      <li
        className={`flex flex-row items-center justify-between w-[18rem] p-4 my-1 ${
          hover && "hover:bg-[#419197]"
        } rounded-md cursor-pointer ${className}`}
        onClick={onClick}
      >
        <div className="flex">
          {icons}
          <h2 className="text-white font-bold ml-2">{text}</h2>
        </div>
        <span
          className={`${
            role == "Dokter"
              ? "bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300"
              : "bg-green-100 text-green-800 text-sm font-medium px-1 rounded dark:bg-green-900 dark:text-green-300 text-[10px]"
          }`}
        >
          {role}
        </span>
      </li>
    </Link>
  );
};

export default SidebarItems;

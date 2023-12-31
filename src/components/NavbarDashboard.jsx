import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";

const NavbarDashboard = () => {
  return (
    <nav className="flex items-center justify-between flex-wrap bg-white p-6 w-full h-[5rem] shadow-md">
      <GiHamburgerMenu size={20} />
      <div>
        <Link to="/" className="ml-5 font-bold text-gray-800">
          Home
        </Link>
        <Link to="/" className="ml-3 font-bold text-gray-800">
          Contact
        </Link>
      </div>
    </nav>
  );
};

export default NavbarDashboard;

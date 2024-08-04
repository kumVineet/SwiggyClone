import { LOGO_URL } from "../utils/constants";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="flex justify-between items-center bg-white shadow-md p-4">
      <div className="flex items-center">
        <img className="w-24" src={LOGO_URL} alt="Logo" />
      </div>
      <div className="flex items-center">
        <ul className="flex space-x-6">
          <li>
            <Link
              to={"/"}
              className="text-gray-800 hover:text-orange-600 transition duration-200"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to={"/about"}
              className="text-gray-800 hover:text-orange-600 transition duration-200"
            >
              About Us
            </Link>
          </li>
          <li>
            <Link
              to={"/contactUs"}
              className="text-gray-800 hover:text-orange-600 transition duration-200"
            >
              Contact Us
            </Link>
          </li>
          <li>
            <Link
              to={"/cart"}
              className="text-gray-800 hover:text-orange-600 transition duration-200"
            >
              Cart
            </Link>
          </li>
          <li>
            <Link
              to={"/login"}
              className="text-gray-800 hover:text-orange-600 transition duration-200"
            >
              <button className="bg-orange-500 text-white py-1 px-3 rounded-md hover:bg-orange-600 transition duration-200">
                Login
              </button>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;

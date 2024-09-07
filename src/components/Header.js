import { LOGO_URL } from "../utils/constants";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const items = useSelector((store) => store.cart.items);

  return (
    <div className=" bg-white shadow-md p-4 ">
      <div className="flex items-center justify-between mx-32">
        <div className="flex items-center ">
          <Link
            to={"/"}
            className="text-gray-800 hover:text-orange-600 transition duration-200"
          >
            <img
              className="w-24 transform transition-transform duration-300 hover:scale-110"
              src={LOGO_URL}
              alt="Logo"
            />
          </Link>
        </div>
        <div className="flex items-center">
          <ul className="flex space-x-6">
            <li>
              <Link
                to={"/"}
                className="text-gray-800 hover:text-orange-600 transition duration-200"
              >
                Search
              </Link>
            </li>
            <li>
              <Link
                to={"/about"}
                className="text-gray-800 hover:text-orange-600 transition duration-200"
              >
                Offers
              </Link>
            </li>
            <li>
              <Link
                to={"/contactUs"}
                className="text-gray-800 hover:text-orange-600 transition duration-200"
              >
                Help
              </Link>
            </li>
            <li>
              <Link
                to={"/login"}
                className="text-gray-800 hover:text-orange-600 transition duration-200"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                to={"/cart"}
                className="text-gray-800 hover:text-orange-600 transition duration-200 font-bold"
              >
                Cart({items.length})
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;

import { FaBars } from "react-icons/fa";
import { NavLink } from "react-router";

const Navbar = () => {
  return (
    <div>
      <div className="navbar bg-gray-800 shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle md:hidden bg-gray-700 text-gray-200 hover:bg-gray-600"
            >
              <FaBars />
            </div>
            <ul
              tabIndex={-1}
              className="menu menu-sm dropdown-content bg-gray-800 rounded-box z-10 mt-3 w-52 p-2 shadow"
            >
              <li>
                <NavLink to="/" className="text-gray-200 hover:text-gray-400">
                  Home
                </NavLink>
              </li>
              
              <li>
                <NavLink to="/about" className="text-gray-200 hover:text-gray-400">
                  About
                </NavLink>
              </li>
              <li>
                <NavLink to="/gallery" className="text-gray-200 hover:text-gray-400">
                  Gallery
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" className="text-gray-200 hover:text-gray-400">
                  Contact
                </NavLink>
              </li>
              <li>
                <NavLink to="/sign_in" className="text-gray-200 hover:text-gray-400">
                  Sign In
                </NavLink>
              </li>
              <li>
                <NavLink to="/verification" className="text-gray-200 hover:text-gray-400">
                  Verification
                </NavLink>
              </li>
              <li>
                <NavLink to="/login" className="text-gray-200 hover:text-gray-400">
                  Login
                </NavLink>
              </li>
            </ul>
          </div>
        </div>

        <div className="navbar-center hidden md:flex">
          <ul className="menu menu-horizontal bg-gray-800 rounded-box p-2 shadow">
            <li>
              <NavLink to="/" className="text-gray-200 hover:text-gray-400">
                Home
              </NavLink>
            </li>
            
            <li>
              <NavLink to="/about" className="text-gray-200 hover:text-gray-400">
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className="text-gray-200 hover:text-gray-400">
                Contact
              </NavLink>
            </li>
            <li>
              <NavLink to="/gallery" className="text-gray-200 hover:text-gray-400">
                Gallery
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="navbar-end hidden md:flex">
          <ul className="menu menu-horizontal bg-gray-800 rounded-box p-2 shadow">
            <li>
              <NavLink to="/sign_in" className="text-gray-200 hover:text-gray-400">
                Sign In
              </NavLink>
            </li>
            <li>
                <NavLink to="/verification" className="text-gray-200 hover:text-gray-400">
                Verification
                </NavLink>
              </li>
            <li>
              <NavLink to="/login" className="text-gray-200 hover:text-gray-400">
                Login
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

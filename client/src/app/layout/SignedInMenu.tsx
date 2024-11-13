import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/configureStore";
import { signOut } from "../../features/account/accountSlice";
import { clearBasket } from "../../features/basket/basketSlice";
import { Link } from "react-router-dom";

interface Props {
  responsive: boolean;
}

const SignedInMenu = ({ responsive }: Props) => {
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.account);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className={responsive ? "hidden lg:block" : "block lg:hidden"}>
      <button
        onClick={toggleDropdown}
        className="inline-flex w-[7.5rem] items-center justify-center rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        {user?.username}
        <svg
          className={`ms-3 h-2.5 w-2.5 transition-transform ${
            isDropdownOpen ? "rotate-180" : ""
          }`}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      {isDropdownOpen && (
        <div
          id="dropdownInformation"
          className={
            responsive
              ? "absolute right-0 top-full z-10 mt-1 w-[7.5rem] divide-y divide-gray-100 rounded-lg bg-white shadow"
              : "sticky right-64 top-56 z-10 mt-1 w-[7.5rem] divide-y divide-gray-100 rounded-lg  bg-white shadow"
          }
        >
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownInformationButton"
          >
            <li>
              {user && user.roles?.includes("Admin") && (
                <Link
                  to="/inventory"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Inventory
                </Link>
              )}
            </li>
            <li>
              <Link
                to="/orders"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                My Orders
              </Link>
            </li>
          </ul>
          <div
            className="py-2"
            onClick={() => {
              dispatch(signOut());
              dispatch(clearBasket());
            }}
          >
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Sign out
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignedInMenu;

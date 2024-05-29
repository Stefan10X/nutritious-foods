import { useState } from "react";
import logo from "./logo.png";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../store/configureStore";
import SignedInMenu from "./SignedInMenu";

// const midLinks = [
//   { title: "catalog", path: "/catalog" },
//   { title: "about", path: "/about" },
//   { title: "contact", path: "/contact" },
// ];

const rightLinks = [
  { title: "login", path: "/login" },
  { title: "register", path: "/register" },
];

const Navbar = () => {
  const { basket } = useAppSelector((state) => state.basket);
  const { user } = useAppSelector((state) => state.account);
  const itemCount = basket?.items.reduce((sum, item) => sum + item.quantity, 0);

  const [color, setColor] = useState(false);
  const [nav, setNav] = useState(false);
  const handleNav = () => {
    setNav(!nav);
  };

  const changeColor = () => {
    if (window.scrollY >= 80) {
      setColor(true);
    } else {
      setColor(false);
    }
  };

  window.addEventListener("scroll", changeColor);

  return (
    <nav
      className={`sticky top-0 z-20 ${
        color
          ? "bg-blue-700 opacity-90 backdrop-blur-sm transition duration-300 ease-in-out"
          : "bg-blue-800"
      }`}
    >
      <div className="m-auto flex h-16 w-[95%] items-center justify-between lg:w-[80%]">
        <div className="flex w-32 items-center justify-start gap-6 lg:w-[270px]">
          <NavLink to={"/"}>
            <img src={logo} alt="logo" className="w-36" />
          </NavLink>
        </div>

        <div className="relative flex w-24 items-center justify-between text-xl text-white lg:w-[270px]">
          <NavLink
            to={"/basket"}
            key={"/basket"}
            className={({ isActive }) => (isActive ? "text-fuchsia-400" : "")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-6 w-6"
            >
              <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
            </svg>
          </NavLink>
          <div
            className={
              basket?.items.length
                ? "absolute bottom-6 left-4 flex h-3 w-3 items-center justify-center rounded-full bg-fuchsia-600 p-2 text-xs text-white lg:bottom-[19px] lg:right-[236px]"
                : "hidden"
            }
          >
            {itemCount}
          </div>

          {user ? (
            <SignedInMenu responsive={true} />
          ) : (
            <div className="hidden gap-10 lg:flex">
              {rightLinks.map(({ title, path }) => (
                <NavLink to={path} key={path}>
                  {title.toUpperCase()}
                </NavLink>
              ))}
            </div>
          )}

          <button
            onClick={handleNav}
            type="button"
            className="ml-3 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-gray-200 lg:hidden "
          >
            <svg
              className="h-8 w-8 fill-white"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>

        <div
          className={
            nav
              ? "fixed right-0 top-16 z-50 flex w-full flex-col items-center gap-8 bg-blue-700 py-8 transition duration-300 ease-in lg:hidden"
              : "pointer-events-none fixed opacity-0"
          }
        >
          {user ? (
            <SignedInMenu responsive={false} />
          ) : (
            <div className="relative justify-between gap-10 text-xl text-white lg:flex lg:w-[270px]">
              <div className="flex gap-4 lg:flex-col">
                {rightLinks.map(({ title, path }) => (
                  <NavLink to={path} key={path}>
                    {title.toUpperCase()}
                  </NavLink>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import home1 from "../assets/home1.png";
import home2 from "../assets/home2.png";
import menu1 from "../assets/menu1.png";
import menu2 from "../assets/menu2.png";
import { Link, useLocation } from "react-router-dom";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const authPage = ["/login"];
  return (
    <>
      <main>
        {children}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </main>
      {!authPage.includes(location.pathname) && (
        <footer className="fixed bottom-0 left-0 z-[10] flex w-full items-center justify-between bg-white px-16 py-4 sm:px-20">
          <Link to="/" className="flex flex-col items-center justify-center">
            {location.pathname === "/" ? (
              <img
                src={home1}
                alt="Icon home 1"
                className="size-8 sm:size-10"
              />
            ) : (
              <img
                src={home2}
                alt="Icon home 1"
                className="size-8 sm:size-10"
              />
            )}
            <p
              className={`text-center text-lg font-semibold ${location.pathname === "/" ? "text-gray-900" : "text-gray-400"}`}
            >
              Home
            </p>
          </Link>
          <Link
            to="/category"
            className="flex flex-col items-center justify-center"
          >
            {location.pathname === "/category" ? (
              <img
                src={menu1}
                alt="Icon home 1"
                className="size-8 sm:size-10"
              />
            ) : (
              <img
                src={menu2}
                alt="Icon home 1"
                className="size-8 sm:size-10"
              />
            )}
            <p
              className={`text-md text-center font-semibold sm:text-lg ${location.pathname === "/category" ? "text-gray-900" : "text-gray-400"}`}
            >
              Menu
            </p>
          </Link>
        </footer>
      )}
    </>
  );
};

export default Layout;

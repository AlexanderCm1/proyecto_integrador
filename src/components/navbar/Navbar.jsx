import React from "react";
import {ReactComponent as Logo} from '../../assets/icons/Logo_upeu.svg'

const Navbar = ({ user, onClick }) => {
  return (
    <nav className="bg-white shadow" role="navigation">
      <div className="container mx-auto p-4 flex flex-wrap items-center md:flex-no-wrap">
        <div className="mr-4 md:mr-8">
          <Logo width="300px"/>
        </div>
        <div className="ml-auto md:hidden">
          <button
            className="flex items-center px-3 py-2 border rounded"
            type="button"
          >
            <svg
              className="h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <div className="w-full md:w-auto md:flex-grow md:flex md:items-center">
          <ul className="flex flex-col mt-4 -mx-4 pt-4 border-t md:flex-row md:items-center md:mx-0 md:mt-0 md:pt-0 md:mr-4 lg:mr-8 md:border-0">
            <li>
              <a className="block px-4 py-1 md:p-2 lg:px-4" href="#" title="Link">
                Link
              </a>
            </li>
            <li>
              <a
                className="block px-4 py-1 md:p-2 lg:px-4 text-purple-600"
                href="#"
                title="Active Link"
              >
                Active Link
              </a>
            </li>
            <li>
              <a className="block px-4 py-1 md:p-2 lg:px-4" href="#" title="Link">
                Link
              </a>
            </li>
          </ul>
          <ul className="flex flex-col mt-4 -mx-4 pt-4 border-t md:flex-row md:items-center md:mx-0 md:ml-auto md:mt-0 md:pt-0 md:border-0">
            <li></li>
            <div className="flex items-center">
              <li className="">{user.nombre + " " + user.apellido}</li>
              <li className="w-14 mx-3">
                <img src={user.foto} alt="user" className="rounded-2xl" />
              </li>
            </div>
            <button onClick={onClick} className="border p-2 bg-red-700 text-white rounded-xl">Log out</button>
            <ul
            className="bg-white border rounded-sm transform scale-0 group-hover:scale-100 absolute 
  transition duration-150 ease-in-out origin-top min-w-32"
          >
            <li className="rounded-sm px-3 py-1 hover:bg-gray-100">Programming</li>
            <li className="rounded-sm px-3 py-1 hover:bg-gray-100">DevOps</li>
            <li className="rounded-sm relative px-3 py-1 hover:bg-gray-100">
              hola
            </li>
          </ul>

          </ul>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;

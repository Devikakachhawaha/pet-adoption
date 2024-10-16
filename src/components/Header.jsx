import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function Header() {
  return (
    <>
      <div className="bg-yellow-100 bg-opacity-50 w-full h-12 pt-1">
        <div className="text-3xl text-black font-bold  text-center ">
        <span className="cursor-pointer">Pet Adoption Form</span>  
        </div>
      </div>
      <nav className="flex justify-center w-auto">
        <ul className="flex justify-center space-x-9 p-2">
          <li>
            <Link
              to="/"
              className="text-black p-1 bg-yellow-50 bg-opacity-50 rounded-md font-bold hover:bg-yellow-200"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/submissions"
              className="text-black font-bold  bg-yellow-50 p-1 bg-opacity-50 rounded-md hover:bg-yellow-200 "
            >
              Submissions
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Header;

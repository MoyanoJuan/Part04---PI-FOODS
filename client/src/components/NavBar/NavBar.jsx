import React, { useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import "./NavBar.css";

export default function NavBar() {
  const [currentPage, setCurrentPage] = useState(1);
  function returnToFirstPage() {
    setCurrentPage(1);
  }
  return (
    <ul className="ul">
      <li>
        <Link to="/home" className="ul-li">
          Home
        </Link>
      </li>
      <li>
        <Link to="/create" className="ul-li">
          Create your own recipe!
        </Link>
      </li>
      <li>
        <SearchBar className="ul-input" returnToFirstPage={returnToFirstPage} />
      </li>
    </ul>
  );
}

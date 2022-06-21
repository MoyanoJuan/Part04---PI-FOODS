import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchByName } from "../../actions/action";
import "./SearchBar.css";

export default function SearchBar({ returnToFirstPage }) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }
  function handleButton(e) {
    e.preventDefault();
    dispatch(searchByName(name)).then(() => {
      returnToFirstPage();
    });
  }

  return (
    <div className="container">
      <input
        className="Input"
        type="text"
        placeholder="Search by name or diet type"
        onChange={(e) => handleChange(e)}
      />
      <button
        className="button-search"
        type="submit"
        onClick={(e) => handleButton(e)}
      >
        Search
      </button>
    </div>
  );
}

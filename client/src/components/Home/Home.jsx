import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getRecipes,
  getDiets,
  filterByDiets,
  orderByName,
  orderByScore,
} from "../../actions/action";
import Card from "../Card/Card";
//import SearchBar from "../SearchBar/SearchBar";
import NavBar from "../NavBar/NavBar";
import Pagination from "../Pagination/Pagination";
import RandomRecipe from "../RandomRecipe/RandomRecipe";
import "./Home.css";

export default function Home() {
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipes);
  const diets = useSelector((state) => state.diets);
  const [cambio, setCambio] = useState(true);
  useEffect(() => {
    dispatch(getRecipes());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);

  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 9;
  const lastRecipe = recipesPerPage * currentPage;
  const firstRecipe = lastRecipe - recipesPerPage;
  const currentRecipes = recipes.slice(firstRecipe, lastRecipe);

  const paginate = (number) => {
    setCurrentPage(number);
  };

  function handleFilterByDiets(e) {
    dispatch(filterByDiets(e.target.value));
  }

  function handleOrderByName(e) {
    dispatch(orderByName(e.target.value));
    cambio ? setCambio(false) : setCambio(true);
  }

  function handleOrderByScore(e) {
    dispatch(orderByScore(e.target.value));
    cambio ? setCambio(false) : setCambio(true);
  }

  /*function returnToFirstPage() {
    setCurrentPage(1);
  }*/

  return (
    <div className="home-back">
      <NavBar />
      <div className="selectors">
        {/*<SearchBar returnToFirstPage={returnToFirstPage} /> queda feo en la home, la muevo a la navbar, mover toda la gilada*/}
        <select
          className="selectors-items"
          onChange={(e) => handleOrderByName(e)}
          defaultValue="default"
        >
          <option value="default" disabled>
            Alphabetical order
          </option>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>
        <select
          className="selectors-items"
          onChange={(e) => handleOrderByScore(e)}
          defaultValue="default"
        >
          <option value="default" disabled>
            Order by score
          </option>
          <option value="desc">Higher</option>
          <option value="asc">Lower</option>
        </select>

        <select
          className="selectors-items"
          onChange={(e) => handleFilterByDiets(e)}
          defaultValue="default"
        >
          <option value="default" disabled>
            Diet type
          </option>
          {diets &&
            diets.map((d) => (
              <option value={d.name} key={d.id}>
                {d.name}
              </option>
            ))}
        </select>
      </div>
      <div>
        <Pagination
          recipesPerPage={recipesPerPage}
          recipes={recipes?.length}
          pagination={paginate}
          currentPage={currentPage}
        />
        <div className="allCards">
          {currentRecipes &&
            currentRecipes.map((el) => {
              return (
                <Card
                  img={el.image}
                  name={el.name}
                  diet={el.diets}
                  id={el.id}
                  key={el.id}
                />
              );
            })}
        </div>
      </div>
      <Link to={"/random"} className="random-pos">
        <button className="random-button">
          If you don't know what to eat:<br></br>Surprise Me!
        </button>
      </Link>
    </div>
  );
}

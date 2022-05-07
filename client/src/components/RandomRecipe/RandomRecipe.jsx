import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { randomRecipe } from "../../actions/action";
import NavBar from "../NavBar/NavBar";
import "./RandomRecipe.css";

export default function RandomRecipe() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(randomRecipe());
  }, [dispatch]);
  const ranRecipe = useSelector((state) => state.random);
  return (
    <div className="random-back">
      <NavBar />
      <div className="random-back">
        {ranRecipe.length > 0 ? (
          <div>
            <h1 className="random-title">{ranRecipe[0].name}</h1>
            <div>
              <img
                className="random-image"
                src={ranRecipe[0].image}
                alt="img not found"
                width="500px"
                height="400px"
              />
            </div>
            <div>
              <h3 className="random-names">Score: {ranRecipe[0].score} </h3>
              <h3 className="random-names">
                Healthy-Food level: {ranRecipe[0].healthScore}
              </h3>
              <h3 className="random-names">Step-by-step:</h3>
              <p
                className="random-text"
                dangerouslySetInnerHTML={{
                  __html: ranRecipe[0].instructions,
                }}
              ></p>
              <h3 className="random-names">Summary:</h3>
              <p
                className="random-text"
                dangerouslySetInnerHTML={{ __html: ranRecipe[0].summary }}
              ></p>
              <h3 className="random-names">Diet types:</h3>
              <ul>
                {ranRecipe[0].diets.map((d) => (
                  <li>{d.name}</li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

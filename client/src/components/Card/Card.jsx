import React from "react";
import { Link } from "react-router-dom";
import "./Card.css";

function Card({ img, name, diet, id }) {
  return (
    <div className="card">
      <div>
        <div className="card-inside">
          <h2 className="card-title">{name}</h2>
          <img
            className="card-image"
            src={img}
            alt="not found"
            width="300px"
            height="300px"
          />
          <ul className="diet-li">
            {diet.map((d) => (
              <li key={d.name}>{d.name}</li>
            ))}
          </ul>
          <div>
            <Link to={"/recipe/" + id}>See recipe details</Link>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default Card;

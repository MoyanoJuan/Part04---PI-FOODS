import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { recipeDetail } from "../../actions/action";
import NavBar from "../NavBar/NavBar";
import "./RecipeDetail.css";

export default function RecipeDetail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(recipeDetail(id));
  }, [dispatch, id]);

  const detailedRecipe = useSelector((state) => state.detail);
  // console.log(detailedRecipe);

  return (
    <div className="detail-back">
      <NavBar />
      <div className="detail-back">
        {detailedRecipe.length > 0 ? (
          <div>
            <h1 className="detail-title">{detailedRecipe[0].name}</h1>
            <div>
              <img
                className="detail-image"
                src={detailedRecipe[0].image}
                alt="img not found"
                width="500px"
                height="400px"
              />
            </div>
            <div>
              <h3 className="detail-names">
                Score: {detailedRecipe[0].score}{" "}
              </h3>
              <h3 className="detail-names">
                Healthy-Food level: {detailedRecipe[0].healthScore}
              </h3>
              <h3 className="detail-names">Step-by-step:</h3>
              <p
                className="detail-text"
                dangerouslySetInnerHTML={{
                  __html: detailedRecipe[0].instructions,
                }}
              ></p>
              <h3 className="detail-names">Summary:</h3>
              <p
                className="detail-text"
                dangerouslySetInnerHTML={{ __html: detailedRecipe[0].summary }}
              ></p>
              <h3 className="detail-names">Diet types:</h3>
              <ul>
                {detailedRecipe[0].diets.map((d) => (
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

// dangerouslySetInnerHTML recordar esto!!!!!
/*En React, dangerouslySetInnerHTML es el atributo que reemplaza 
a innerHTML (propiedad DOM). Significa “establecer HTML interno peligrosamente”.
 En general, es riesgoso establecer contenido HTML desde el código, porque puedes 
 exponer inadvertidamente a tus usuarios a un ataque cross-site scripting (XSS). 
 Por lo tanto, para establecer contenido HTML directamente desde React, 
 debes usar el atributo dangerouslySetInnerHTML y 
 pasarle un objeto con una propiedad __html, como recordatorio de que es peligroso. */

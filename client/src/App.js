import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./components/Landing/Landing";
import Home from "./components/Home/Home";
import RecipeCreate from "./components/RecipeCreate/RecipeCreate";
import RecipeDetail from "./components/RecipeDetail/RecipeDetail";
import React from "react";
import RandomRecipe from "./components/RandomRecipe/RandomRecipe";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <React.Fragment>
            <Route exact path="/home" element={<Home />} />
            <Route path="/create" element={<RecipeCreate />} />
            <Route path="/recipe/:id" element={<RecipeDetail />} />
            <Route path="/random" element={<RandomRecipe />} />
          </React.Fragment>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

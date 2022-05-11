const { Router } = require("express");
const { Recipe, Diet } = require("../db");
require("dotenv").config();
const { API_KEY } = process.env;
const cors = require("cors");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const model = require("../ApiInfo/AllData");

const router = Router();
/*router.use(
  cors({
    origin: "http//localhost:3001",
    methods: ["GET", "POST"],
  })
);*/
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/recipes", async (req, res, next) => {
  try {
    const { name } = req.query;
    const everything = await model.allData();
    const recipes = await model.infoByName(name);
    if (name) {
      let findDiet = await Diet.findOne({
        where: { name: name.toLowerCase() },
      });
      if (findDiet) {
        let dieType = recipes.filter((r) => {
          let names = r.diets.map((d) => d.name);
          if (names.includes(name)) return r;
        });
        return dieType.length
          ? res.status(200).send(dieType)
          : res
              .status(400)
              .send("No existen recetas con el tipo de dieta indicado");
      } else {
        let findRecipe = recipes.filter((r) =>
          r.name.toLowerCase().includes(name.toString().toLowerCase())
        );
        return findRecipe.length
          ? res.status(200).send(findRecipe)
          : res.status(400).send("No existen recetas con ese nombre");
      }
    }
    if (!name) res.status(200).send(everything);
  } catch (error) {
    next(error);
  }
});

router.get("/recipes/:id", async (req, res, next) => {
  const { id } = req.params;
  const recipes = await model.allData();
  if (id) {
    const recipesID = await recipes.filter((r) => r.id == id);
    recipesID.length ? res.send(recipesID) : res.send("No se encontró receta.");
  } else {
    res.send("Ingresar un ID please");
  }
});

router.get("/types", async (req, res, next) => {
  try {
    const diets = await Diet.findAll();
    diets.length ? res.send(diets) : res.send("error al traer dietas");
  } catch (e) {
    next(e);
  }
});

router.post("/recipe", async (req, res, next) => {
  try {
    const { name, summary, score, healthScore, image, stepByStep, diets } =
      req.body;
    const newRecipe = await Recipe.create({
      name: name,
      summary: summary,
      score: score,
      image: image,
      healthScore: healthScore,
      instructions: stepByStep,
    });
    diets.forEach(async (d) => {
      const dbDiet = await Diet.findOrCreate({
        where: {
          name: d,
        },
      });
      newRecipe.setDiets(dbDiet);
      //newRecipe.addDiets(dbDiet[0]);
    });
    res.send("¡Receta creada con éxito!");
  } catch (error) {
    next(error);
  }
});

router.get("/random", async (req, res, next) => {
  try {
    const random = await model.randomRecipe();
    res.status(200).send(random);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

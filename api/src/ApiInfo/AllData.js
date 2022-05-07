require("dotenv").config();
const { API_KEY, API_KEY2 } = process.env;
const axios = require("axios");
const { Recipe, Diet } = require("../db");

const allApiData = async function () {
  const apiUrl = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY2}&number=60&addRecipeInformation=true`
  );
  const apiInfo = await apiUrl.data.results.map((element) => {
    return {
      id: element.id,
      name: element.title,
      summary: element.summary,
      diets: element.diets.map((d) => {
        return { name: d };
      }),
      score: element.spoonacularScore,
      healthScore: element.healthScore,
      image: element.image,
      createdInDb: false,
      instructions: element.analyzedInstructions[0]?.steps.map((paso) => {
        return `<b>${paso.number}</b> ${paso.step}<br>`;
      }),
    };
  });
  return apiInfo;
};

const allDbData = async function () {
  return await Recipe.findAll({
    include: {
      model: Diet,
      attibutes: ["name"],
      through: {
        attibutes: [],
      },
    },
  });
};

const allData = async function () {
  const apiData = await allApiData();
  const dbData = await allDbData();

  const allDataContainer = apiData.concat(dbData);
  return allDataContainer;
};

const allDiets = async function () {
  const dietList = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY2}&number=60&addRecipeInformation=true`
  );
  const repeated = await dietList.data.results.map((d) => d.diets).flat(1);
  return [...new Set(repeated)];
};

const apiByName = async function (name) {
  const apiUrl = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?query=${name}&number=60&addRecipeInformation=true&apiKey=${API_KEY2}`
  );
  const nameList = apiUrl.data.results.map((element) => {
    return {
      id: element.id,
      name: element.title,
      summary: element.summary,
      diets: element.diets.map((d) => {
        return { name: d };
      }),
      score: element.spoonacularScore,
      healthScore: element.healthScore,
      image: element.image,
      createdInDb: false,
      instructions: element.analyzedInstructions[0]?.steps.map((paso) => {
        return `<b>${paso.number}</b> ${paso.step}<br>`;
      }),
    };
  });
  return nameList;
};
const infoInDb = async function (name) {
  const DBInfo = await allDbData();
  const filtByName = DBInfo.filter((recipe) => recipe.name.includes(name));
  return filtByName;
};
const infoByName = async function (name) {
  const apiName = await apiByName(name);
  const DBByName = await infoInDb(name);
  const infoTotal = apiName.concat(DBByName);
  return infoTotal;
};

const randomRecipe = async function () {
  const ranUrl = await axios.get(
    `https://api.spoonacular.com/recipes/random?apiKey=${API_KEY2}`
  );
  const random = await ranUrl.data.recipes.map((element) => {
    return {
      id: element.id,
      name: element.title,
      summary: element.summary,
      diets: element.diets.map((d) => {
        return { name: d };
      }),
      score: element.spoonacularScore,
      healthScore: element.healthScore,
      image: element.image,
      createdInDb: false,
      instructions: element.analyzedInstructions[0]?.steps.map((paso) => {
        return `<b>${paso.number}</b> ${paso.step}<br>`;
      }),
    };
  });
  return random;
};

module.exports = {
  allData,
  allDbData,
  allApiData,
  allDiets,
  apiByName,
  infoInDb,
  infoByName,
  randomRecipe,
};

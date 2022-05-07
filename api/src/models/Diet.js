const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "diet",
    {
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
/*const { DataTypes, Model, Sequelize } = require("sequelize");
const { conn } = require("../db");

class Diet extends Model {}

Diet.init(
  {
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
  },
  {
    conn,
    modelName: "Diet",
  }
);

async () => {
  await Diet.sync();
  console.log("model `Diet` synced");
};

module.exports = Diet;*/

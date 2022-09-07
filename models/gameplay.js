"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Gameplay extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        foreignKey: "userid",
        sourceKey: "id",
        as: "gameplay_user",
      });

      this.belongsTo(models.Game, {
        foreignKey: "gameid",
        sourceKey: "id",
        as: "gameplay_game",
      });
    }
  }
  Gameplay.init(
    {
      gameid: DataTypes.INTEGER,
      userid: DataTypes.INTEGER,
      score: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Gameplay",
    }
  );
  return Gameplay;
};

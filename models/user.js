"use strict";

const { hash } = require("bcryptjs");
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Gameplay, {
        foreignKey: "userid",
        sourceKey: "id",
        as: "gameplay_user",
      });
    }
  }
  User.init(
    {
      fullname: DataTypes.STRING,
      email: DataTypes.STRING,
      username: {
        type: DataTypes.STRING,
        unique: {
          args: true,
          msg: "The username is already registerd",
        },
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [6],
            msg: "password at least 6 characters",
          },
        },
      },
      total_score: DataTypes.INTEGER,
      bio: DataTypes.STRING,
      city: DataTypes.STRING,
      social_media_url: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
      hooks: {
        beforeCreate: (user, options) => {
          user.password = hashPassword(user.password);
        },
      },
    }
  );
  User.addHook("beforeBulkUpdate", (user, options) => {
    user.attributes.password = hashPassword(user.attributes.password);
  });
  return User;
};

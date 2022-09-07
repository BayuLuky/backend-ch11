const { Game, Gameplay, User } = require("../../models");
const { Op } = require("sequelize");

class GameController {
  static async createGame(req, res, next) {
    try {
      const { name, description, thumbnail_url, game_url } = req.body;
      if (!name) {
        return res.status(400).json({
          result: "failed",
          message: "Nama game tidak boleh kosong!",
        });
      }
      const newGame = {
        name,
        description,
        thumbnail_url,
        game_url,
      };
      const createdGame = await Game.create(newGame);
      if (createdGame) {
        return res.status(201).json({
          result: "success",
          message: "Game berhasil ditambahkan!",
          data: createdGame,
        });
      }
    } catch (error) {
      next(error);
    }
  }

  static async getGames(req, res, next) {
    try {
      let conditions = [];
      const { name, description, thumbnail_url, game_url, play_count } =
        req.query;
      if (name) {
        conditions.push({ name });
      }
      if (description) {
        conditions.push({ description });
      }
      if (thumbnail_url) {
        conditions.push({ thumbnail_url });
      }
      if (game_url) {
        conditions.push({ game_url });
      }
      if (play_count) {
        conditions.push({ play_count });
      }

      const data = await Game.findAll({
        where: {
          [Op.and]: conditions,
        },
      });
      if (data) {
        return res.status(200).json({
          result: "success",
          message: "Data game berhasil ditampilkan!",
          data,
        });
      }
    } catch (error) {
      next(error);
    }
  }

  static async getGameById(req, res, next) {
    try {
      const { id } = req.params;
      const game = await Game.findByPk(id);
      if (game) {
        return res.status(200).json({
          result: "success",
          message: "Data game berhasil ditampilkan!",
          data: game,
        });
      } else {
        return res.status(404).json({
          result: "failed",
          message: "Game tidak ditemukan!",
        });
      }
    } catch (error) {
      next(error);
    }
  }

  static async getLeaderboardByGame(req, res, next) {
    try {
      const gameplay = await Gameplay.findAll({
        where: {
          gameid: req.params.id,
        },
        attributes: ["gameid", "userid", "score"],
        order: [["score", "DESC"]],
        include: {
          model: User,
          as: "gameplay_user",
          attributes: ["fullname", "username", "email"],
        },
      });

      if (gameplay) {
        return res.status(200).json({
          result: "success",
          message: "Data leaderboard berdasarkan game berhasil ditampilkan!",
          data: gameplay,
        });
      }
    } catch (error) {
      next(error);
    }
  }

  static async getLeaderboardByUser(req, res, next) {
    try {
      const gameplay = await Gameplay.findAll({
        where: {
          userid: req.params.id,
        },
        attributes: ["gameid", "userid", "score"],
        order: [["score", "DESC"]],
        include: {
          model: Game,
          as: "gameplay_game",
          attributes: ["name", "description"],
        },
      });

      if (gameplay) {
        return res.status(200).json({
          result: "success",
          message: "Data leaderboard berdasarkan user berhasil ditampilkan!",
          data: gameplay,
        });
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = GameController;

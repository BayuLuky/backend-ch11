const { User } = require("../../models");


class UserController {
    static async getUserScores(req, res, next) {
      try {
          const scores = await User.findAll({
              attributes: ['username', 'fullname', 'total_score'],
              order: [
              ['createdAt', 'DESC'],
              ],
          });
          if (scores) {
              return res.status(200).json({
                result: "Success",
                scores,
              });
            }
      } catch (error) {
          next(error);
      }
    }

    static async getUsers(req, res, next) {
        try {
            const data = await User.findAll({
                include: [],
                order: [
                ['createdAt', 'DESC'],
                ],
            });
            if (data) {
                return res.status(200).json({
                  result: "Success",
                  data,
                });
              }
        } catch (error) {
            next(error);
        }
    }

    static async getUserDetail(req, res, next) {
        try {
            const { id } = req.params;
            const user = await User.findByPk(id);
            if (user) {
                return res.status(200).json({
                result: "Success",
                data: user,
                });
            } else {
                return res.status(404).json({
                result: "Not found",
                message: `User with ${id} not found`
                })
            }
        } catch (error) {
            next(error);
        }
    }

    static async updateUser(req, res, next) {
        try {
          console.log(req.body)
          console.log(req.headers)
            const { id } = req.params;
            const user = await User.findByPk(id)
            if (!user) return res.status(404).json({ result: "Not found", message: `User with ${id} not found` })
            const updatedUser = await User.update(req.body, {
              where: { id: id },
            });
            if (updatedUser == 1) {
              return res.status(200).json({
                result: "Success",
                message: `User with id: ${id} successfully updated`,
              });
            } else {
              return res.status(500).json({
                result: "failed",
                message: "Failed to update",
              });
            }
        } catch (error) {
            next(error);
        }        
    }

    static async updateImageUser(req, res, next) {
        try {
          console.log(req)
          console.log(req.body)
          console.log(req.headers)
            const { id } = req.params;
            const user = await User.findByPk(id)
            if (!user) return res.status(404).json({ result: "Not found", message: `User with ${id} not found` })
            const updatedUser = await User.update(img_url, {
              where: { id: id },
            });
            if (updatedUser == 1) {
              return res.status(200).json({
                result: "Success",
                message: `User with id: ${id} successfully updated`,
              });
            } else {
              return res.status(500).json({
                result: "failed",
                message: "Failed to update",
              });
            }
        } catch (error) {
            next(error);
        }        
    }
}

module.exports = UserController;
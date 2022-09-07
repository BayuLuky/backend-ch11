const { Gameplay } = require("../../models");
const { User } = require("../../models");

class GameplayController {
    static async addScores(req, res, next){
        try {
            const { gameid, userid, score } = req.body;
            const newScores = {
                gameid,
                userid,
                score,
            };
            const id = req.body.userid;
            const user = await User.findByPk(id);
            if (!user) return res.status(404).json({ result: "Not found", message: `User with ${id} not found` });
            let { fullname, email, username, password, total_score, bio, city, social_media_url } = user;
            total_score += req.body.score;
            const updateUser = { fullname, email, username, password, total_score, bio, city, social_media_url };
            const addScores = await Gameplay.create(newScores);
            const updatedUser = await User.update(updateUser, { where: { id: id },});
            if (addScores && updatedUser == 1){
                return res.status(200).json({
                    result: "success",
                    data: addScores,
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

module.exports = GameplayController;
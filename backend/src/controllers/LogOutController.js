const { SocietiesModels } = require("../models");

module.exports = {
  LogOutController: async (req, res) => {
    const token = req.query.token;

    try {
      await SocietiesModels.update({ login_token: "no login" }, { where: { login_token: token } });
      res.status(200).json({ message: "logout success" });
    } catch (error) {
      res.status(500).json({ message: "server error" });
    }
  },
};

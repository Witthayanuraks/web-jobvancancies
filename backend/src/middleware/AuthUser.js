const jwt = require("jsonwebtoken");
const { SocietiesModels } = require("../models");

const secretkey = process.env.SECRETKEY;

module.exports = {
  AuthUser: async (req, res, next) => {
    const token = req.query.token;

    try {
      const getIndatabase = await SocietiesModels.findOne({ where: { login_token: token } });

      if (!token) {
        return res.status(403).json({ message: "Token not provided" });
      }

      if (getIndatabase) next();
      else res.status(401).json({ message: "Invalid token" });
    } catch (error) {
      res.status(500).json({ message: "server error" });
    }
  },
};

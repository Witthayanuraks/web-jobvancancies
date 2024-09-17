const { SocietiesModels, ValidationModels, JobApplyPositionModels, JobApplySocietiesModels } = require("../models");

module.exports = {
  AcceptUser: async (req, res, next) => {
    const { token } = req.query;
    const { vacancy_id, notes } = req.body;
    try {
      const { id } = await SocietiesModels.findOne({
        where: { login_token: token },
      });

      const getValidator = await ValidationModels.findOne({
        where: { society_id: id },
      });

      if (getValidator.status != "accepted") {
        res.status(401).json({ message: "Your data validator must be accepted by validator before" });
      } else {
        await JobApplySocietiesModels.create({ job_vacancy_id: vacancy_id, society_id: id, date: Date(), notes });
        next();
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "server error" });
    }
  },

  FindOneJob: async (req, res, next) => {
    const { token } = req.query;
    try {
      const { id } = await SocietiesModels.findOne({
        where: { login_token: token },
      });

      const getAplcationJob = await JobApplyPositionModels.findAll({ where: { society_id: id } });
      if (getAplcationJob.length == 0) next();
      else res.json({ message: "Application for a job can only be once" });
    } catch (error) {
      console.log(error);
    }
  },
};

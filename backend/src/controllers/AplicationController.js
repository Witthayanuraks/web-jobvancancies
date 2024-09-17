const { SocietiesModels, JobApplyPositionModels, AvaliablePositionsModels, JobVacancieModels, JobApplySocietiesModels } = require("../models");

module.exports = {
  postAplicationController: async (req, res) => {
    const { token } = req.query;
    const { vacancy_id: job_vacancy_id, positions } = req.body;

    try {
      const { id: society_id } = await SocietiesModels.findOne({ where: { login_token: token }, attributes: ["id"] });

      const { id: job_apply_societies_id } = await JobApplySocietiesModels.findOne({ where: { society_id } });

      positions.map(async (e) => {
        const { id: position_id, apply_capacity } = await AvaliablePositionsModels.findOne({ where: { position: e }, attributes: ["id", "apply_capacity"] });

        await JobApplyPositionModels.create({ date: Date(), society_id, job_vacancy_id, position_id, job_apply_societies_id, status: "pending" });

        await AvaliablePositionsModels.update({ apply_capacity: apply_capacity + 1 }, { where: { id: position_id } });
      });

      res.status(200).json({ message: "Applying for job successful" });
    } catch (error) {
      res.status(500).json({ message: "server Error" });
      console.log(error);
    }
  },
};

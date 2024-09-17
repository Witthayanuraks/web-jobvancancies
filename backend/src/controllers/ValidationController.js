const { SocietiesModels, ValidationModels, JobCategorieModels, ValidatorModels } = require("../models");

module.exports = {
  postValidationController: async (req, res) => {
    const token = req.query.token;
    const { wrok_experience, job_category, job_position, reason_accepted } = req.body;

    try {
      const getJob = await JobCategorieModels.findOne({
        where: {
          job_category,
        },
      });

      const getSociety = await SocietiesModels.findOne({
        where: {
          login_token: token,
        },
      });

      await ValidationModels.create({
        society_id: getSociety.id,
        job_category_id: getJob.id,
        wrok_experience,
        job_position,
        reason_accepted,
        status: "pending",
      });

      res.json({ message: "Data validation request submitted successfully" });
    } catch (error) {
      res.status(500).json({ message: "server error" });
    }
  },
  getValidationController: async (req, res) => {
    const token = req.query.token;
    try {
      const { id } = await SocietiesModels.findOne({
        where: {
          login_token: token,
        },
        attributes: ["id"],
      });

      const getValidation = await ValidationModels.findOne({
        include: ValidatorModels,
        where: {
          society_id: id,
        },
      });

      res.status(200).json({
        validasi: {
          id: getValidation.id,
          status: getValidation.status,
          wrok_experience: getValidation.wrok_experience,
          job_category_id: getValidation.job_category_id,
          job_position: getValidation.job_position,
          reason_accepted: getValidation.reason_accepted,
          validator_notes: getValidation.validator_notes,
          validator: getValidation.validator,
        },
      });
    } catch (error) {
      res.status(500).json({ validasi: null });
    }
  },
};

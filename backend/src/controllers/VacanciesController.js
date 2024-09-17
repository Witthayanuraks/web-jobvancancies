const { JobVacancieModels, JobCategorieModels, AvaliablePositionsModels } = require("../models");

module.exports = {
  getAllVacanciesController: async (req, res, next) => {
    const { id } = req.query;
    if (id) {
      next();
      return;
    }

    try {
      const vacancies = await JobVacancieModels.findAll({
        include: [
          { model: JobCategorieModels, as: "category" },
          { model: AvaliablePositionsModels, attributes: ["position", "capacity", "apply_capacity"] },
        ],
        attributes: ["id", "company", "address", "description"],
      });

      res.status(200).json({ vacancies });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "server error" });
    }
  },
  findVacanciesController: async (req, res) => {
    const { id } = req.query;

    try {
      const vacancies = await JobVacancieModels.findOne({
        include: [
          { model: JobCategorieModels, as: "category" },
          { model: AvaliablePositionsModels, attributes: ["position", "capacity", "apply_capacity"] },
        ],
        attributes: ["id", "company", "address", "description"],
        where: { id },
      });

      res.status(200).json({ vacancies });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "server error" });
    }
  },
};

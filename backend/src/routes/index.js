const express = require("express");

const { AuthUser } = require("../middleware/AuthUser");
const { LoginController } = require("../controllers/LoginController");
const { LogOutController } = require("../controllers/LogOutController");
const { postValidationController, getValidationController } = require("../controllers/ValidationController");
const { getAllVacanciesController, findVacanciesController } = require("../controllers/VacanciesController");
const { AcceptUser, FindOneJob } = require("../middleware/AuthAplication");
const { postAplicationController } = require("../controllers/AplicationController");
const { JobVacancieModels, JobApplyPositionModels, JobApplySocietiesModels, JobCategorieModels, AvaliablePositionsModels, SocietiesModels } = require("../models");

const route = express.Router();

route.post("/login", LoginController);

route.post("/logout", AuthUser, LogOutController);

route.post("/validation", AuthUser, postValidationController);

route.get("/validations", AuthUser, getValidationController);

route.get("/job_vacancies", AuthUser, getAllVacanciesController, findVacanciesController);

route.post("/aplication", AuthUser, AcceptUser, FindOneJob, postAplicationController);

route.get("/aplication", AuthUser, async (req, res) => {
  const { token } = req.query;
  try {
    const { id } = await SocietiesModels.findOne({ where: { login_token: token }, attributes: ["id"] });
    const vacancies = await JobVacancieModels.findAll({
      include: [
        {
          model: JobApplyPositionModels,
          as: "position",
          where: { society_id: id },
          include: [
            {
              model: JobApplySocietiesModels,
              // as: "positions",
              attributes: ["notes"],
            },
            {
              model: AvaliablePositionsModels,
              attributes: ["position"],
            },
          ],
          attributes: ["id", "date", "status"],
        },
        {
          model: JobCategorieModels,
          as: "category",
          attributes: ["job_category"],
        },
      ],
      attributes: ["id", "company", "address"],
    });

    // const vacancies = [];

    // data.map((e) => {});
    // const data = await JobApplyPositionModels.findAll({
    //   include: JobApplySocietiesModels,
    // });
    res.json({ vacancies });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error" });
  }
});

module.exports = route;

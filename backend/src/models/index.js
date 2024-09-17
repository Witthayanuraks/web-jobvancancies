const { database } = require("../database");
const AvaliablePositionsModels = require("./AvaiablePosition");
const JobApplyPositionModels = require("./JobApplyPosition");
const JobCategorieModels = require("./JobCategori");
const JobSocietieModels = require("./JobSocietie");
const JobVacancieModels = require("./JobVacancie");
const RegionalModels = require("./Regional");
const SocietiesModels = require("./Societie");
const UserModels = require("./User");
const ValidationModels = require("./Validation");
const ValidatorModels = require("./Validator");
const JobApplySocietiesModels = require("./JobApplySocietie");

// relasi antara regional dan societies
SocietiesModels.belongsTo(RegionalModels, { foreignKey: "regional_id" });
RegionalModels.hasOne(SocietiesModels, { foreignKey: "id" });

// relasi antra society dan validation
ValidationModels.belongsTo(SocietiesModels, { foreignKey: "society_id" });
SocietiesModels.hasOne(ValidationModels, { foreignKey: "id" });

// relasi antara JobApplyPosition dan Societies
JobApplyPositionModels.belongsTo(SocietiesModels, { foreignKey: "society_id" });
SocietiesModels.hasOne(JobApplyPositionModels, { foreignKey: "id" });

// jobacancies and JobApplySocieties
JobVacancieModels.belongsTo(JobApplySocietiesModels, { foreignKey: "id" });
JobApplySocietiesModels.hasOne(JobSocietieModels, { foreignKey: "society_id" });

// JobApplyPosition and JobVacancie
JobApplyPositionModels.belongsTo(JobVacancieModels, { foreignKey: "job_vacancy_id" });
JobVacancieModels.hasMany(JobApplyPositionModels, { foreignKey: "job_vacancy_id", as: "position" });

//
JobApplySocietiesModels.hasOne(JobApplyPositionModels, { foreignKey: "id" });
JobApplyPositionModels.belongsTo(JobApplySocietiesModels, { foreignKey: "job_apply_societies_id" });

// job kategori
JobVacancieModels.belongsTo(JobCategorieModels, { foreignKey: "job_catogory_id", as: "category" });
JobCategorieModels.hasOne(JobVacancieModels, { foreignKey: "id" });

//
AvaliablePositionsModels.belongsTo(JobVacancieModels, { foreignKey: "id" });
JobVacancieModels.hasMany(AvaliablePositionsModels, { foreignKey: "job_vacancy_id" });

//
JobApplyPositionModels.belongsTo(AvaliablePositionsModels, { foreignKey: "position_id" });
AvaliablePositionsModels.hasOne(JobApplyPositionModels, { foreignKey: "id" });

//
SocietiesModels.hasOne(JobApplySocietiesModels, { foreignKey: 'society_id' });
JobApplySocietiesModels.belongsTo(SocietiesModels, { foreignKey: 'society_id' });
// JobVacancieModels.belongsTo()

ValidationModels.belongsTo(JobCategorieModels, { foreignKey: "job_category_id" });
ValidationModels.belongsTo(ValidatorModels, { foreignKey: "validator_id" });
ValidatorModels.belongsTo(UserModels, { foreignKey: "user_id" });
JobApplySocietiesModels.belongsTo(JobVacancieModels, { foreignKey: "job_vacancy_id" });

database.sync().then(() => console.log("database terkoneksi"));

module.exports = {
  UserModels,
  ValidatorModels,
  ValidationModels,
  SocietiesModels,
  JobCategorieModels,
  RegionalModels,
  JobSocietieModels,
  JobVacancieModels,
  AvaliablePositionsModels,
  JobApplyPositionModels,
  JobApplySocietiesModels,
};

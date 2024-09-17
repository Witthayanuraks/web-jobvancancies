const { SocietiesModels, RegionalModels } = require("../models");
const crypto = require("crypto");

const createMD5Hash = (data) => {
  const hash = crypto.createHash("md5");
  hash.update(data);
  return hash.digest("hex");
};

module.exports = {
  LoginController: async (req, res) => {
    const { id_card_number, password } = req.body;

    if (!(id_card_number || password)) {
      res.status(401).json({ message: "no id_card_number or password" });
      return;
    }

    try {
      const getData = await SocietiesModels.findOne({
        include: RegionalModels,
        where: {
          id_card_number,
        },
      });

      if (getData && getData.password == password) {
        const token = createMD5Hash(getData.name)
        await SocietiesModels.update({ login_token: token }, { where: { id_card_number } });

        res.status(200).json({
          name: getData.name,
          gender: getData.gender,
          address: getData.address,
          login_token: token,
          regional: {
            province: getData.regional.province,
            district: getData.regional.district,
          },
        });
      } else res.status(401).json({ message: "nomer KTP atau katasandi salah" });
    } catch (error) {
      // console.log(error);
      res.status(500).json({ messgae: "server error" });
    }
  },
};

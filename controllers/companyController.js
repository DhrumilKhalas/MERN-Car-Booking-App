import Car from "../models/carModel.js";

export const getByCompany = async (req, res) => {
  try {
    const company = req.params.company;
    if (company === "all") {
      const byCompany = await Car.find();
      return res.send(byCompany);
    } else {
      const byCompany = await Car.find({ company: company });
      return res.send(byCompany);
    }
  } catch (err) {
    // console.log(err)
    return res.send(err)
  }
};

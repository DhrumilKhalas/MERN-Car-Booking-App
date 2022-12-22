import Car from "../models/carModel.js";

const carController = {
  createCar: async (req, res) => {
    try {
      const newCar = await Car(req.body);
      await newCar.save();
      return res.send(newCar);
    } catch (err) {
      return res.send(err);
    }
  },

  getAllCars: async (req, res) => {
    try {
      const allCars = await Car.find();
      return res.send(allCars);
    } catch (err) {
      return res.send(err);
    }
  },

  getCarById: async (req, res) => {
    try {
      const carById = await Car.findById(req.params.id);
      return res.send(carById);
    } catch (err) {
      // console.log(err);
      return res.send("No car found with this Id!");
    }
  },
};

export default carController;

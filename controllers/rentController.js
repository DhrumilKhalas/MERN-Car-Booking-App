import Rent from "../models/rentModel.js";
import Car from "../models/carModel.js";

export const rentCar = async (req, res) => {
  try {
    const newRent = new Rent(req.body);
    await newRent.save();
    const car = await Car.findById({ _id: req.body.car });
    car.bookedTimeSlots.push(req.body.bookedTimeSlots);
    await car.save();
    return res.status(200).send("The car rented successfully!");
  } catch (err) {
    // console.log(err);
    return res.status(400).send("Error occured while renting a car!", err);
  }
};

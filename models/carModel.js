import mongoose from "mongoose";

const carSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      require: true,
    },
    payPerDay: {
      type: Number,
      required: true,
    },
    fuelType: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    bookedTimeSlots: [
      {
        from: { type: String, required: true },
        to: { type: String, required: true },
      },
    ],
    capacity: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Car = mongoose.model("Car", carSchema);

export default Car;

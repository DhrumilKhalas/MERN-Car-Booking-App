import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    company: {
      type: String,
    },
  },
  { timestamps: true }
);

const Company = mongoose.model("Company", companySchema);

export default Company;

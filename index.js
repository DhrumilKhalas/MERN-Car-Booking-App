import express, { urlencoded } from "express";
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 4120;
const URI = process.env.MONGO_URI;
import mongoose from "mongoose";
import carRouter from "./routes/carRoutes.js";
import userRouter from "./routes/userRoute.js";
import rentRouter from "./routes/rentRoute.js";
import companyRouter from "./routes/companyRoute.js";
import path from "path"
import { fileURLToPath } from 'url';


const app = express();

app.use(express.json());
app.use(urlencoded({ extended: true }));

app.use("/api/cars", carRouter);
app.use("/api/users", userRouter);
app.use("/api/rent", rentRouter);
app.use("/api/company", companyRouter);

const connection = () => {
  mongoose
    .connect(URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then(() => {
      console.log("Connected to MongoDB!");
    })
    .catch((err) => {
      console.log("Error connecting to MongoDB!", err);
    });
};

// serving the frontend
const __filename = fileURLToPath(import.meta.url);
app.use(express.static(path.join(__filename, "../client/car/build")))

app.get("*", function(_,res) {
    res.sendFile(
        path.join(__filename, "../client/car/build/index.html"),
        function(err){
            res.status(500).send(err)
        }
    )
})

app.get("/", (req, res) => {
  res.send("Hello from the server side!");
});

app.listen(PORT, () => {
  connection();
  console.log(`Server is running on port ${PORT}.`);
});

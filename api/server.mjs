import express from "express";
import cors from "cors";
import carsRoute from "../routes/cars.mjs";

const server = express();

server.use(express.json());
server.use(cors());

server.use("/api/cars", carsRoute);

server.use("/", (req, res) =>
  res.send(`
    <h2>Cars API</h2>
  `)
);

// Export server
export default server;

import express from "express";
import db from "../data/db-config.js";

const router = express.Router();

// Get all cars
router.get("/", async (req, res) => {
  try {
    const cars = await db.getAll();
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ error: "The cars info could not be retrieved." });
  }
});

// Get car by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const car = await db.getById(id);

    if (!car)
      return res
        .status(404)
        .json({ message: "The car with the specified ID does not exist." });

    res.status(200).json(car);
  } catch (error) {
    console.log("The cars information could not be retrieved.", error);
    res
      .status(500)
      .json({ error: "The car information could not be retrieved." });
  }
});

// Create new car
router.post("/", async (req, res) => {
  if (!req.body)
    return res.status(400).json({
      errorMessage: "Please provide required info for the car."
    });

  try {
    const newCar = await db.add(req.body);
    res.status(201).json(newCar);
  } catch (error) {
    console.log("The car information could not be retrieved.", error);
    res
      .status(500)
      .json({ error: "The car information could not be retrieved." });
  }
});

// Delete car
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const removed = await db.remove(id);
    if (!removed)
      return res
        .status(404)
        .json({ message: "The car with the specified ID does not exist." });

    res.status(200).json({ message: "car removed" });
  } catch (error) {
    console.log("The car could not be removed", error);
    res.status(500).json({ error: "The car could not be removed" });
  }
});

// Update cars
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    if (!req.body)
      return res.status(500).json({ error: "The cars could not be removed" });

    const updatedCar = await db.update(id, req.body);

    if (!updatedCar)
      return res
        .status(404)
        .json({ message: "The car with the specified ID does not exist." });

    const car = await db.getById(id);
    res.status(200).json(car);
  } catch (error) {
    console.log("The car information could not be modified.", error);
    res
      .status(500)
      .json({ error: "The car information could not be modified." });
  }
});

export default router;

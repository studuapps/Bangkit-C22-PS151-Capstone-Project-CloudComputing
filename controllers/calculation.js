/*
  IMPORT MODULE CALCULATIONS MODEL
*/
const Calculation = require("../models/calculationModels");

// create calculation
exports.createCalculation = async (req, res) => {
  const { gender, age, weight, height } = req.body;
  const calc_date = new Date();

  try {
    await Calculation.create({
      gender: gender,
      age: age,
      weight: weight,
      height: height,
    });
    // Process Calculation at here

    // Send status
    res.status(201).json({
      msg: "Create Calculation is success",
    });
  } catch (error) {
    res.status(500).json({ msg: "Some error occurred while creating the calculation" });
  }
};

// get calculations
exports.getLogCalculations = async (req, res) => {
  try {
    const calculation = await Calculation.findAll({
      attributes: ["createdAt", "age", "weight", "height", "gender", "category"],
    });
    res.send(calculation);
  } catch (error) {
    res.status(500).json({ msg: "Error to get data calculation" });
  }
};

// delete log calculations
exports.deleteLogCalculations = async (req, res) => {
  try {
    await Calculation.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json({
      msg: "Logs deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ msg: "Error to delete calculation" });
  }
};

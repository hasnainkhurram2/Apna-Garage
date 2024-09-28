const models = require("../models/index");

exports.getAllCars = async (req, res) => {
  const temp = await models.Car.findAll();

  res.status(200).json({
    status: "success",
    data: temp,
  });
};

exports.getCar = async (req, res) => {
  const _id = req.params.id;
  const yourCar = await models.Car.findByPk(_id);
  if (!yourCar) {
    res.status(404).json({
      error: "could not find car with that id",
    });
  } else {
    res.status(200).json({
      data: yourCar,
    });
  }
};

exports.getReviews = async (req, res) => {
  const carId = req.params.id;
  try {
    const temp = await models.Review.findAll({
      where: {
        car_id: carId,
      },
    });
    console.log(temp);

    res.status(200).json({
      data: temp,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Car not found",
      error: error.message,
    });
  }
};

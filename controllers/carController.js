require("dotenv").config();

module.exports.addCar = async (req, res) => {
  if (req.user.role == "admin") {
    try {
      const {
        model,
        seater,
        bags,
        transmission,
        group,
        available,
        rentPerDay
      } = req.body;
      let car = new Car({
        model,
        seater,
        bags,
        transmission,
        group,
        available,
        rentPerDay
      });
      await car.save();
      return res
        .status(200)
        .json({ message: `${model} added successfully`, error: false });
    } catch (err) {
      return res.status(406).json({ message: err.message, error: true }); // not acceptable
    }
  } else {
    return res.status(404).json({ message: "Access not provided" });
  }
};

module.exports.getAllCars = async (req, res) => {
  try {
    let cars = await Car.find({});
    return res
      .status(200)
      .json({ message: `success`, data: cars, error: false });
  } catch (err) {
    return res
      .status(406)
      .json({ message: err.message, data: null, error: true }); // not acceptable
  }
};

module.exports.getSingleCar = async (req, res) => {
  try {
    let car = await Car.findOne({ _id: req.params.id });
    return res
      .status(200)
      .json({ message: `success`, data: car, error: false });
  } catch (err) {
    return res
      .status(406)
      .json({ message: err.message, data: null, error: true }); // not acceptable
  }
};

module.exports.deleteCar = async (req, res) => {
  if (req.user.role == "admin") {
    try {
      let car = await Car.findOneAndRemove({ _id: req.params.id });
      if (car) {
        return res
          .status(200)
          .json({ message: `success`, data: null, error: false });
      } else {
        return res
          .status(404)
          .json({ message: "not found", data: null, error: false });
      }
    } catch (err) {
      return res
        .status(406)
        .json({ message: err.message, data: null, error: true }); // can not be deleted
    }
  } else {
    return res.status(404).json({ message: "Access not provided" });
  }
};

module.exports.updateCar = async (req, res) => {
  try {
    let car = await Car.findOne({ _id: req.params.id });
    if (car) {
      const newcar = {
        model: req.body.model,
        seater: req.body.seater,
        bags: req.body.bags,
        transmission: req.body.transmission,
        group: req.body.group,
        available: req.body.available,
        booked: req.body.booked,
        rentPerDay: req.body.rentPerDay
      };
      await car.updateOne({ _id: req.params.id, newcar });
      return res
        .status(200)
        .json({ message: `success`, data: newcar, error: false });
    } else {
      return res
        .status(404)
        .json({ message: "not found", data: null, error: false });
    }
  } catch (err) {
    return res
      .status(406)
      .json({ message: err.message, data: null, error: true });
  }
};

module.exports.getFilterResults = async (req, res) => {
  const { seater, bags, group, transmission, available, gt, lt } = req.query;
  let cars;
  cars = await Car.find(
    { seater, bags, group, transmission, available },
    { rentPerDay: { $gt: gt, $lt: lt } }
  );
  console.log(cars);
  // in process
};

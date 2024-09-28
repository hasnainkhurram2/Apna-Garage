exports.health_check = (req, res) => {
  console.log("Health Check");
  res.status(200).json({
    data: "im alive",
  });
};

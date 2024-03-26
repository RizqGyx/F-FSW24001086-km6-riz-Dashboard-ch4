const carPostValidation = (carData) => {
  const formatKeys = [
    "plate",
    "manufacture",
    "model",
    "image",
    "rentPerDay",
    "capacity",
    "description",
    "availableAt",
    "transmission",
    "available",
    "type",
    "year",
    "options",
    "specs",
  ];

  const keys = Object.keys(carData);

  const isValidFormat =
    keys.length === formatKeys.length &&
    formatKeys.every((key) => keys.includes(key));

  return isValidFormat;
};

module.exports = { carPostValidation };

const validateUpdateData = (dataToUpdate, allowedKeys) => {
  const keys = Object.keys(dataToUpdate);
  return keys.every((key) => allowedKeys.includes(key));
};

module.exports = { validateUpdateData };

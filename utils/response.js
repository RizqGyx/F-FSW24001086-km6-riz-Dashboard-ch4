const response = (
  statusCode,
  data,
  message,
  req,
  res,
  includeTotalData = false
) => {
  const responseData = {
    message: message,
    requestAt: req.requestTime,
  };

  if (includeTotalData) {
    responseData.totalData = data.length;
  }

  responseData.payload = {
    status_code: statusCode,
    datas: data ? data : "Not Found",
  };

  res.status(statusCode).json(responseData);
};

module.exports = { response };

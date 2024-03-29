const response = (
  statusCode,
  data,
  status,
  message,
  req,
  res,
  includeTotalData = false
) => {
  const responseData = {
    status_code: statusCode,
    message: message,
    requestAt: req.requestTime,
  };

  if (includeTotalData) {
    responseData.totalData = data.length;
  }

  responseData.payload = {
    status: status,
    datas: data ? data : "Not Found",
  };

  res.status(statusCode).json(responseData);
};

module.exports = { response };

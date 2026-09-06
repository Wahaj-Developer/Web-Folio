export const apiResponse = (success, data, message, pagination = null) => {
  const response = {
    success,
    data,
    message,
  };

  if (pagination) {
    response.pagination = pagination;
  }

  return response;
};

export const successResponse = (data, message = 'Operation successful', pagination = null) => {
  return apiResponse(true, data, message, pagination);
};

export const errorResponse = (message = 'Operation failed', data = null) => {
  return apiResponse(false, data, message);
};

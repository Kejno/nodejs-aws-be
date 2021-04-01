export const createResponse = (statusCode, data, message, isError = false) => {

  const errorTemplate = {
    statusCode,
    error: {
      message
    }
  }

  return {
    statusCode: statusCode,
    body: JSON.stringify(
      isError ? errorTemplate : data,
    ),
  }
};
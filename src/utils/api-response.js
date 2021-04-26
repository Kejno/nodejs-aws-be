export const createResponse = (statusCode, data, message, isError = false) => {

  const errorTemplate = {
    statusCode,
    error: {
      message
    }
  };

  return {
    statusCode,
    headers: {
      "Access-Control-Allow-Origin" : "*", 
      "Access-Control-Allow-Credentials" : true 
    },
    body: JSON.stringify(
      isError ? errorTemplate : data,
    ),
  };
};

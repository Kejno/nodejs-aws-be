/* eslint-disable no-undef */
  export const basicAuthorizer = (event, context, callback) => {
    console.log('Event: ', JSON.stringify(event));
  
    if (event.type !== 'TOKEN') {
      callback('Unauthorized');
    }

    try {
        const [, encodedToken] = event.authorizationToken.split('Basic ');

        if (!encodedToken) {
            callback(null, generatePolicy(encodedToken, event.methodArn, 'Deny'));
          }

        const token = Buffer.from(encodedToken, 'base64').toString();
        const [username, password] = token.split(':');
        console.log(token);

        const storedUserPassword = process.env[username];
        const effect = !storedUserPassword || storedUserPassword !== password ? 'Deny' : 'Allow';
        const policy = generatePolicy(encodedToken, event.methodArn, effect);
        callback(null, policy);

        
    } catch (error) {
        callback('Unauthorized: ' + error.message);
    }
  
  };

  
const generatePolicy = (principalId, resource, effect = 'Allow') => ({
    principalId,
    policyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Action: 'execute-api:Invoke',
          Effect: effect,
          Resource: resource
        }
      ]
    }
  });
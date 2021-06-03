/* eslint-disable no-undef */
  export const basicAuthorizer = (event, context, callback) => {
    console.log('Event: ', JSON.stringify(event));
  
    if (event.type !== 'TOKEN') {
      callback('Unauthorized');
    }

    try {
        const [, encodedToken] = event.authorizationToken.split('Basic ');

        if (!encodedToken) {
            callback(null, generatePolicy(encodedToken, 'Deny', event.methodArn));
          }

        const token = Buffer.from(encodedToken, 'base64').toString();
        const [username, password] = token.split(':');
        console.log(token);

        const storedUserPassword = process.env[username];
        const effect = !storedPassword || storedUserPassword !== password ? 'Deny' : 'Allow';

        const policy = generatePolicy(encodedToken, effect, event.methodArn);
        callback(null, policy);

        
    } catch (error) {
        callback('Unauthorized: ' + error.message);
    }
  
    // if (user === 'ilyavalasiuk' && password === process.env['ilyavalasiuk']) {
    //   callback(null, generatePolicy('user', 'Allow', event.methodArn))
    // } else {
    //   callback(null, generatePolicy('user', 'Deny', event.methodArn))
    // }
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
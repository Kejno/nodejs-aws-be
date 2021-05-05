import { S3 } from 'aws-sdk';
import { createResponse } from '../../utils/api-response';
  
export const importProductsFile = async (event) => {
    const BUCKET = 'import-service-task-5';

    const queryParams = event.queryStringParameters;

    if (!queryParams.name) {
        return createResponse(500, null, 'Name not passed', true);
      }

    const s3 = new S3({ region: 'eu-west-1' });
    
    try {
        const catalogPath = `uploaded/${queryParams.name}`;

        const params = {
            Bucket: BUCKET,
            Key: catalogPath,
            Expires: 60,
            ContentType: 'text/csv'
        };

        await s3.putObject(params).promise();

        const url = await s3.getSignedUrlPromise('putObject', params);

        return createResponse(200, { url });
    } catch (error) {
        console.log(error);
        return createResponse(500, error, true);
    }

};


import { SNS } from 'aws-sdk';
import { Client } from 'pg';
import { dbOptions } from '../../db/db-options';
import { createProduct } from '../createProduct/createProduct';

export const catalogBatchProcess = async (event) => {

  const sns = new SNS();


  const client = new Client(dbOptions);
  await client.connect();

  try {
    for (const record of event.Records) {

     const data = JSON.parse(record.body);
     console.log('typeof record', typeof data);
      const newProduct = await createProduct({body: JSON.stringify(data)});

      if (newProduct) {
        sns.publish({
          Subject: 'New product created',
          Message: JSON.stringify(data),
          MessageAttributes: {
            name: {
              DataType: 'String',
              StringValue: data.name
            }
          },
          TopicArn: process.env.SNS_ARN
        }, (error, data) => {
          if (error) {
            console.log(`Error for send email: ${error}`);
          } else {
            console.log(`Send email for ${data.name}`);
          }
        });
      }
    }

    return { statusCode: 201 };
  } catch (error) {
    console.log(error);

    return { statusCode: 500 };
  } finally {
    client.end();
  }
};

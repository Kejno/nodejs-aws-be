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
      console.log(record.body);
     // const data = JSON.parse(record.body);
      const data = record.body;

      const newProduct = await createProduct(data, client);

      if (newProduct) {
        sns.publish({
          Subject: 'New product created',
          Message: JSON.stringify(data),
          MessageAttributes: {
            title: {
              DataType: 'String',
              StringValue: data.name
            }
          },
          TopicArn: process.env.SNS_ARN
        }, (error, data) => {
          if (error) {
            console.log(`Error for send email: ${error}`);
          } else {
            console.log(`Send email for ${data.title}`);
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

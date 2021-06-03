import { S3, SQS } from 'aws-sdk';
import util from 'util';
import stream from 'stream';
import csv from 'csv-parser';

const BUCKET = 'import-service-task-5';

export const getUploadedList = async (event) => {
console.log('event.Records', event.Records);
    const finished = util.promisify(stream.finished);
    const s3 = new S3({ region: 'eu-west-1' });
    const sqs = new SQS();

    try {
        for (const record of event.Records) {

            const res = [];
            const params = {
                Bucket: BUCKET,
                Key: record.s3.object.key
            };
            const s3Stream = s3.getObject(params).createReadStream();

            await finished(s3Stream
                .pipe(csv())
                .on('data', (data) => res.push(data))
            );
            console.log(`Data for ${record.s3.object.key}:`);
            console.log(res);

            res.forEach(r => {
                sqs.sendMessage({
                    QueueUrl: 'https://sqs.eu-west-1.amazonaws.com/761799363911/sqs-task6',
                    MessageBody: JSON.stringify(r)
                }, (err, data) => {
                    if (err) {
                        console.log('Error: ' + err);
                    } else {
                        console.log('Send message for: ' + data);
                    }
                });
            });

            await s3.copyObject({
                Bucket: BUCKET,
                CopySource: BUCKET + '/' + record.s3.object.key,
                Key: record.s3.object.key.replace('uploaded', 'parsed')
            }).promise();

            console.log(`${record.s3.object.key} copied`);

            await s3.deleteObject(params).promise();

            console.log(`${record.s3.object.key} deleted`);
        }

        return { statusCode: 201 };
    } catch (error) {
        return { statusCode: 500 };
    }

};
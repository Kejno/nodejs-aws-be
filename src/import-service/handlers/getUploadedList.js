import AWS from 'aws-sdk';
import util from 'util';
import stream from 'stream';
import csv from 'csv-parser';

const BUCKET = 'task-5';

export const getUploadedList = async (event) => {

    const finished = util.promisify(stream.finished);
    const s3 = new AWS.S3({ region: 'eu-west-1' });

    try {
        for (const record of event.Records) {

            const res = [];
            const params = {
                Bucket: BUCKET,
                Prefix: 'uploaded/',
                Key: record.s3.object.key
            };
            const s3Stream = s3.getObject(params).createReadStream();

            await finished(s3Stream
                .pipe(csv())
                .on('data', (data) => res.push(data))
            );
            console.log(`Data for ${record.s3.object.key}:`);
            console.log(res);

            await s3.copyObject({
                Bucket: BUCKET,
                CopySource: BUCKET + '/' + record.s3.object.key,
                Key: record.s3.object.key.replace('uploaded', 'parsed')
            }).promise();

            console.log(`${record.s3.object.key} copied`);

            await s3.deleteObject(params).promise();
      
            console.log(`${record.s3.object.key} deleted`);
        }

        return { statusCode: 202 };
    } catch (error) {
        return { statusCode: 500 };
    }

};
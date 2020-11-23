import { Credentials } from 'aws-sdk';
import S3 from 'aws-sdk/clients/s3';

const s3Client = new S3({
  region: process.env.LINODE_OBJECT_STORAGE_REGION,
  endpoint: process.env.LINODE_OBJECT_STORAGE_ENDPOINT,
  sslEnabled: true,
  s3ForcePathStyle: false,
  credentials: new Credentials({
    accessKeyId: process.env.LINODE_OBJECT_STORAGE_ACCESS_KEY_ID,
    secretAccessKey: process.env.LINODE_OBJECT_STORAGE_SECRET_ACCESS_KEY,
  }),
});

export async function uploadFile(base64, path = '') {
  if (!RegExp(/^data:\w+\/\w+;base64,/).test(base64)) return null;

  const base64Data = Buffer.from(base64.replace(/^data:\w+\/\w+;base64,/, ''), 'base64');
  const [fileType, extension] = base64.split(';')[0].split(':')[1].split('/');

  const params = {
    Bucket: process.env.LINODE_OBJECT_BUCKET,
    Key: `${path}/${new Date().getTime()}.${extension}`,
    Body: base64Data,
    ACL: 'public-read',
    ContentEncoding: 'base64',
    ContentType: `${fileType}/${extension}`,
  };

  // see: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#upload-property
  const { Location } = await s3Client.upload(params).promise();
  return Location;
}

export async function deleteFile(url) {
  if (!url) { return; }

  const Key = url.split(`${process.env.LINODE_OBJECT_STORAGE_ENDPOINT}/`)[1];
  const params = {
    Bucket: process.env.LINODE_OBJECT_BUCKET,
    Key,
  };

  // see: https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#deleteObject-property
  await s3Client.deleteObject(params).promise();
}

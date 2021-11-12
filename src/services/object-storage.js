import { Credentials } from 'aws-sdk';
import S3 from 'aws-sdk/clients/s3';

const bucketKey = process.env.NODE_ENV === 'development' ? `${process.env.NODE_ENV}/` : '';

const s3Client = process.env.USE_OBJECT_STORAGE === 'true' ? new S3({
  region: process.env.LINODE_OBJECT_STORAGE_REGION,
  endpoint: process.env.LINODE_OBJECT_STORAGE_ENDPOINT,
  sslEnabled: true,
  s3ForcePathStyle: false,
  credentials: new Credentials({
    accessKeyId: process.env.LINODE_OBJECT_STORAGE_ACCESS_KEY_ID,
    secretAccessKey: process.env.LINODE_OBJECT_STORAGE_SECRET_ACCESS_KEY,
  }),
}) : null;

export async function uploadFileToObjectStorage(base64Data, path, fileName, fileType, extension) {
  const params = {
    Bucket: process.env.LINODE_OBJECT_BUCKET,
    Key: `${bucketKey}${path}/${fileName}`,
    Body: base64Data,
    ACL: 'public-read',
    ContentEncoding: 'base64',
    ContentType: `${fileType}/${extension}`,
  };

  // see: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#upload-property
  const { Location } = await s3Client.upload(params).promise();
  return Location;
}

export async function deleteFileFromObjectStorage(url) {
  const Key = url.split(`${process.env.LINODE_OBJECT_STORAGE_ENDPOINT}/`)[1];
  const params = {
    Bucket: process.env.LINODE_OBJECT_BUCKET,
    Key,
  };

  // see: https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#deleteObject-property
  // eslint-disable-next-line consistent-return
  return s3Client.deleteObject(params).promise();
}

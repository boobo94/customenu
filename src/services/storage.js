import { unlink, writeFileSync } from 'fs';
import { uploadFileToObjectStorage, deleteFileFromObjectStorage } from './object-storage';

export async function uploadFile(base64, path = '') {
  if (!RegExp(/^data:\w+\/\w+;base64,/).test(base64)) return null;

  const base64Data = Buffer.from(base64.replace(/^data:\w+\/\w+;base64,/, ''), 'base64');
  const [fileType, extension] = base64.split(';')[0].split(':')[1].split('/');
  const fileName = `${new Date().getTime()}.${extension}`;

  if (process.env.USE_OBJECT_STORAGE) {
    return uploadFileToObjectStorage(base64Data, path, fileName, fileType, extension);
  }

  writeFileSync(`${process.env.LOCAL_STORAGE_PATH}/${fileName}`, base64Data);

  return `${process.env.API_URL}/cdn/${fileName}`;
}

export async function deleteFile(url) {
  if (!url) { return; }

  if (process.env.USE_OBJECT_STORAGE) {
    await deleteFileFromObjectStorage(url);
    return;
  }

  const urlParams = url.split('/');

  // delete file
  unlink(`${process.env.LOCAL_STORAGE_PATH}/${urlParams[urlParams.length]}`, (err) => {
    if (err) throw err;
  });
}

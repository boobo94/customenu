import errors from '../../locales/errors.json';
import statusCodes from '../utils/statusCodes';

export default async (req, res) => {
  try {
    const path = `${process.env.LOCAL_STORAGE_PATH}/${req.params.fileName}`;
    console.log(req.params.fileName);
    return res.status(statusCodes.OK).sendFile(path);
  } catch (error) {
    console.log(error);
    return res.status(statusCodes.SERVER_INTERNAL_ERROR).send({ error: errors.SERVER_ERROR });
  }
};

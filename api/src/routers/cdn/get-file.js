import statusCodes from '../utils/statusCodes';

export default async (req, res) => {
  try {
    const path = `${process.env.LOCAL_STORAGE_PATH}/${req.params.fileName}`;
    return res.status(statusCodes.OK).sendFile(path);
  } catch (error) {
    return res.status(statusCodes.SERVER_INTERNAL_ERROR).send({ error: res.__('SERVER_ERROR') });
  }
};

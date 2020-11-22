import { Controllers } from '../../../../database';
import errors from '../../../../locales/errors.json';
import statusCodes from '../../../utils/statusCodes';

export default async (req, res) => {
  try {
    const newEntry = {
      ...req.body,
      categoryId: req.params.categoryId,
    };
    if (req.body.file) {
      // todo: upload file
      // newEntry.image = URL
    }

    const created = await Controllers.subcategory.create(newEntry);

    return res.status(statusCodes.OK).send(created);
  } catch (error) {
    return res.status(statusCodes.SERVER_INTERNAL_ERROR).send({ error: errors.SERVER_ERROR });
  }
};

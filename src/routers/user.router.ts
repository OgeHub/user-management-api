import express, { Router } from 'express';
import userControllers from '../controllers/user.controller';

const router: Router = express.Router();

router.post('/', userControllers.createUser);
router
  .route('/:id')
  .get(userControllers.getUser)
  .patch(userControllers.updateUser)
  .delete(userControllers.deleteUser);

export default router;

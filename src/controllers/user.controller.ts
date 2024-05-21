import { Request, Response, NextFunction } from 'express';
import userServices from '../services/user.service';
import {
  validateCreateUserData,
  validateUpdateUserData,
} from '../validators/user.validator';
import logger from '../utils/customLogger';

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    validateCreateUserData(req.body);

    const user = await userServices.createUser(req.body);

    if (user) {
      logger.info(
        `[CreateUserController]:User with name ${user.name} created successfully`,
      );

      return res.status(201).send({
        status: 'success',
        statusCode: 201,
        message: 'User created successfully',
      });
    }
  } catch (error: any) {
    logger.error(`[CreateUserController]:${error.message}`);
    next(error);
  }
};

const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userServices.getUser(req.params.id);

    if (user) {
      logger.info(`[GetUserController]:User details retrieved successfully`);

      return res.status(200).send({
        status: 'success',
        statusCode: 200,
        message: 'User details retrieved successfully',
        data: user,
      });
    }
  } catch (error: any) {
    logger.error(`[GetUserController]:${error.message}`);
    next(error);
  }
};

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    validateUpdateUserData(req.body);

    const id = req.params.id;
    const user = await userServices.updateUser(id, req.body);

    if (user) {
      logger.info(`[UpdateUserController]:User updated successfully`);

      return res.status(200).send({
        status: 'success',
        statusCode: 200,
        message: 'User updated successfully',
        data: user,
      });
    }
  } catch (error: any) {
    logger.error(`[UpdateUserController]:${error.message}`);
    next(error);
  }
};

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userServices.deleteUser(req.params.id);

    if (user) {
      logger.info(`[DeleteUserController]:User deleted successfully`);

      return res.status(200).send({
        status: 'success',
        statusCode: 200,
        message: 'User deleted successfully',
      });
    }
  } catch (error: any) {
    logger.error(`[DeleteUserController]:${error.message}`);
    next(error);
  }
};

const userControllers = { createUser, getUser, updateUser, deleteUser };

export default userControllers;

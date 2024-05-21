import UserModel from '../models/user.model';
import User from '../interfaces/user.interface';
import HttpException from '../utils/http.exception';

const ensureUserExists = (user: User | null) => {
  if (!user) throw new HttpException(404, 'User not found');
  return user;
};

const createUser = async (data: User): Promise<User | Error> => {
  const newUser = new UserModel(data);
  await newUser.save();
  return newUser;
};

const getUser = async (id: string): Promise<User | null> => {
  const user = await UserModel.findById(id).select('-__v');
  return ensureUserExists(user);
};

const updateUser = async (id: string, data: object): Promise<User | null> => {
  const user = await UserModel.findByIdAndUpdate(id, data, {
    new: true,
  }).select('-__v');
  return ensureUserExists(user);
};

const deleteUser = async (id: string): Promise<User | null> => {
  const user = await UserModel.findByIdAndDelete(id);
  return ensureUserExists(user);
};

const userServices = { createUser, getUser, updateUser, deleteUser };

export default userServices;

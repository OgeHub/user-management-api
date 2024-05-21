import { z } from 'zod';
import User from '../interfaces/user.interface';

// Validates user creation data
export const validateCreateUserData = (data: User) => {
  const schema = z.object({
    name: z.string(),
    email: z.string().email(),
    age: z.number().optional(),
  });

  return schema.parse(data);
};

// Validates user update data
export const validateUpdateUserData = (data: object) => {
  const schema = z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    age: z.number().optional(),
  });

  return schema.parse(data);
};

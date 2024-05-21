import request, { Test } from 'supertest';
import express, { Application } from 'express';
import userController from '../controllers/user.controller';
import userServices from '../services/user.service';
import HttpException from '../utils/http.exception';
import errorMiddleware, {
  unhandledRoutes,
} from '../middlewares/error.middleware';

// Mock the userServices module
jest.mock('../services/user.service');

// Set up application and initialize routes and middlewares
const app: Application = express();
app.use(express.json());

app.post('/users', userController.createUser);
app.get('/users/:id', userController.getUser);
app.patch('/users/:id', userController.updateUser);
app.delete('/users/:id', userController.deleteUser);
app.use(unhandledRoutes);
app.use(errorMiddleware);

// User controller tests
describe('User Controller', () => {
  const mockUser = {
    _id: '507f191e810c19729de860ea',
    name: 'Tech Sisi',
    email: 'test@code.io',
    age: 25,
  };

  const sendRequest = async (
    method: 'post' | 'get' | 'patch' | 'delete',
    url: string,
    data?: object,
  ): Promise<Test> => {
    const req = request(app)[method](url);
    if (data) {
      req.send(data);
    }
    return req;
  };

  const testResponse = async (
    method: 'post' | 'get' | 'patch' | 'delete',
    url: string,
    data: object | undefined,
    expectedStatus: number,
    expectedBody?: object,
  ) => {
    const response = await sendRequest(method, url, data);
    expect(response.status).toBe(expectedStatus);
    if (expectedBody) {
      expect(response.body).toEqual(expectedBody);
    }
  };

  const mockServiceError = (service: any, status: number, message: string) => {
    (service as jest.Mock).mockRejectedValue(
      new HttpException(status, message),
    );
  };

  // Create user test cases
  describe('POST /users', () => {
    it('should create a new user', async () => {
      (userServices.createUser as jest.Mock).mockResolvedValue(mockUser);

      await testResponse(
        'post',
        '/users',
        { name: 'Tech Sisi', email: 'test@code.io', age: 25 },
        201,
        {
          status: 'success',
          statusCode: 201,
          message: 'User created successfully',
        },
      );
    });

    it('should handle bad request', async () => {
      mockServiceError(userServices.createUser, 400, 'Bad request');
      await testResponse(
        'post',
        '/users',
        { name: 'Tech Sisi', email: 'test@code.io', age: [] },
        400,
      );
    });

    it('should handle errors during user creation', async () => {
      mockServiceError(userServices.createUser, 500, 'Error creating user');
      await testResponse(
        'post',
        '/users',
        { name: 'Tech Sisi', email: 'test@code.io', age: 25 },
        500,
      );
    });
  });

  // Get user details test cases
  describe('GET /users/:id', () => {
    it('should return a user derails', async () => {
      (userServices.getUser as jest.Mock).mockResolvedValue(mockUser);

      await testResponse(
        'get',
        '/users/507f191e810c19729de860ea',
        undefined,
        200,
        {
          status: 'success',
          statusCode: 200,
          message: 'User details retrieved successfully',
          data: mockUser,
        },
      );
    });

    it('should handle user not found', async () => {
      mockServiceError(userServices.getUser, 404, 'User not found');
      await testResponse(
        'get',
        '/users/507f191e810c19729de860ea',
        undefined,
        404,
      );
    });

    it('should handle error while fetching user details', async () => {
      mockServiceError(userServices.getUser, 500, 'Error fetching user');
      await testResponse(
        'get',
        '/users/507f191e810c19729de860ea',
        undefined,
        500,
      );
    });
  });

  // Update user test cases
  describe('PATCH /users/:id', () => {
    const updatedUser = {
      name: 'New Techy',
      email: 'testing@code.io',
      age: 24,
    };

    it('should update a user by ID', async () => {
      (userServices.updateUser as jest.Mock).mockResolvedValue(updatedUser);

      await testResponse(
        'patch',
        '/users/507f191e810c19729de860ea',
        { name: 'New Techy', email: 'testing@code.io', age: 24 },
        200,
        {
          status: 'success',
          statusCode: 200,
          message: 'User updated successfully',
          data: updatedUser,
        },
      );
    });

    it('should handle bad request', async () => {
      mockServiceError(userServices.updateUser, 400, 'Bad request');
      await testResponse(
        'patch',
        '/users/507f191e810c19729de860ea',
        { name: 'Tech Sisi', email: 'test@code.io', age: [] },
        400,
      );
    });

    it('should handle errors when user is not found', async () => {
      mockServiceError(userServices.updateUser, 404, 'User not found');
      await testResponse(
        'patch',
        '/users/507f191e810c19729de860ea',
        { name: 'New Techy', email: 'testing@code.io', age: 24 },
        404,
      );
    });

    it('should handle error while updating user details', async () => {
      mockServiceError(userServices.updateUser, 500, 'Error updating user');
      await testResponse(
        'patch',
        '/users/507f191e810c19729de860ea',
        { name: 'New Techy', email: 'testing@code.io', age: 24 },
        500,
      );
    });
  });

  // Delete user test cases
  describe('DELETE /users/:id', () => {
    it('should delete a user by ID', async () => {
      (userServices.deleteUser as jest.Mock).mockResolvedValue(true);

      await testResponse(
        'delete',
        '/users/507f191e810c19729de860ea',
        undefined,
        200,
        {
          status: 'success',
          statusCode: 200,
          message: 'User deleted successfully',
        },
      );
    });

    it('should handle errors when user is not found', async () => {
      mockServiceError(userServices.deleteUser, 404, 'User not found');
      await testResponse(
        'delete',
        '/users/507f191e810c19729de860ea',
        undefined,
        404,
      );
    });

    it('should handle error while deleting user', async () => {
      mockServiceError(userServices.deleteUser, 500, 'Error deleting user');
      await testResponse(
        'delete',
        '/users/507f191e810c19729de860ea',
        undefined,
        500,
      );
    });
  });

  // Unhandled routes test cases
  describe('Unhandled routes', () => {
    it('Should handle post routes not in the server', async () => {
      await testResponse('post', '', undefined, 404);
    });

    it('Should handle get routes not in the server', async () => {
      await testResponse('get', '', undefined, 404);
    });

    it('Should handle patch routes not in the server', async () => {
      await testResponse('patch', '', undefined, 404);
    });

    it('Should handle delete routes not in the server', async () => {
      await testResponse('delete', '', undefined, 404);
    });
  });
});

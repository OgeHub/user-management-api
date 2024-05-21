import { Schema, model } from 'mongoose';
import User from '../interfaces/user.interface';

const userSchema = new Schema<User>(
    {
        name: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            unique: true,
            required: true,
        },

        age: Number,
    },
    {
        timestamps: true,
    },
);

const UserModel = model<User>('User', userSchema);

export default UserModel;

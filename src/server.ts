import 'dotenv/config';
import mongoose from 'mongoose';
import app from './app';

mongoose
    .connect(`${process.env.MONGODB_URI}`)
    .then(() => console.log('Database connected successfully'))
    .catch((err) => console.log(err.message));

const PORT = process.env.PORT || 3030;
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));

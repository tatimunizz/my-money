import mongoose from 'mongoose';

const DB_URL = `${process.env.MONGODB_URL}`;
mongoose.connect(DB_URL);

export default mongoose.connection.once('open', () => {
  console.log('MongoDB connected');
});

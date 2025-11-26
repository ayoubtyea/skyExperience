import mongoose from 'mongoose';

const DEFAULT_LOCAL_URI = 'mongodb://127.0.0.1:27017/skyexp';

const connectDB = async () => {
  const connectionUri = process.env.DATABASE_URL || DEFAULT_LOCAL_URI;
  try {
    await mongoose.connect(connectionUri);
    const { host, name } = mongoose.connection;
    console.log(`MongoDB connected successfully → ${host}/${name}`);
  } catch (error) {
    console.error('Database connection failed', error);
    console.error('Tried connection string:', connectionUri);
    console.error('Tip: ensure MongoDB is running locally or update DATABASE_URL');
    process.exit(1);
  }
};

export default connectDB;

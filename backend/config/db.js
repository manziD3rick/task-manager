import mongoose from 'mongoose';

export async function connectDB() {
  await mongoose.connect('mongodb://localhost:27017/task-manager');
  console.log('MongoDB connected');
}



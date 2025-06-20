import { app } from '../app';
import connectDB from '../config/db';

let isConnected = false;

export default async function handler(req: any, res: any) {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
  }

  return app(req, res);
}

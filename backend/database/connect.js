import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()
export const connection_to_db = async () => {
  const connect = await mongoose.connect(process.env.MONGOURL, {
    useNewurlParser: true,

    useUnifiedTopology: true,
  });
  return connect;
};

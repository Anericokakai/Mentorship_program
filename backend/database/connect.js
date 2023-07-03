import mongoose from "mongoose";

export const connection_to_db = async () => {
  const connect = await mongoose.connect("mongodb://127.0.0.1:27017/find_your_mentor", {
    useNewurlParser: true,

    useUnifiedTopology: true,
  });
  return connect;
};

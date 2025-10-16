import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

async function connectDB(): Promise<void> {
  if (connection.isConnected) {
    console.log("Already connected to db");
    return;
  }

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("⚠️ MONGODB_URI is not defined in .env");
  }

  try {
    const db = await mongoose.connect(uri || "", {});
    connection.isConnected = db.connections[0].readyState;
    console.log("DB connected successfully");
  } catch (error) {
    console.log("DB connection failed ", error);
    process.exit(1);
  }
}

export default connectDB;

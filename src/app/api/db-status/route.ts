import { NextResponse } from "next/server";
import connectDB from "@/lib/db/connectDB";
import mongoose from "mongoose";

export async function GET() {
  console.log("in get method");
  try {
    await connectDB();

    const isConnected = mongoose.connection.readyState === 1; // 1 = connected
    if (isConnected) {
      return NextResponse.json(
        { status: "Connected to MongoDB" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { status: "Not Connected to MongoDB" },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        status: "Error connecting to MongoDB",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}

// pages/api/auth/register.ts
import { sendJsonResponse } from "@/helpers/sendJsonResponse";
import connectDB from "@/lib/db/connectDB";
import UserModel from "@/models/User";
import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";

export async function POST(request: Request) {
  await connectDB();
  try {
    const { firstName, lastName, phoneNumber, email, password } =
      await request.json();
    console.log("req.body", password);
    const existingUserEmail = await UserModel.findOne({
      email,
    });
    if (existingUserEmail) {
      return sendJsonResponse(false, "Email already exists", 400);
    }

    const hashedPass = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      firstName,
      lastName,
      phoneNumber,
      email,
      password: hashedPass,
    });

    await newUser.save();
    return sendJsonResponse(true, "User registered successfully", 201);
  } catch (error) {
    console.error("error registering user", error);
    return sendJsonResponse(false, "Error registering user", 500);
  }
}

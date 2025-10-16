import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db/connectDB";
import CategoryModel from "@/models/Category";
import { errorResponse, successResponse } from "@/helpers/response";

// GET /api/categories - Get all categories
export async function GET() {
  try {
    await connectDB();

    const categories = await CategoryModel.find().sort({ createdAt: -1 });

    return successResponse(categories);
  } catch (error) {
    console.error("GET /api/categories error:", error);

    return errorResponse("Failed to fetch categories");
  }
}

// POST /api/categories - Create a new category
export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();

    // Basic input validation
    const name = body.name?.trim();
    const description = body.description?.trim() || "";

    if (!name || name.length < 1) {
      return errorResponse("Category name is required", 400);
    }

    const slug = name.toLowerCase().replace(/\s+/g, "-");

    // Check for duplicate category
    const exists = await CategoryModel.findOne({ slug });
    if (exists) {
      return errorResponse("Category already exists", 409);
    }

    const newCategory = await CategoryModel.create({
      name,
      slug,
      description,
    });

    return successResponse(newCategory);
  } catch (error) {
    console.error("POST /api/categories error:", error);
    return errorResponse("Failed to create category", 501);
  }
}

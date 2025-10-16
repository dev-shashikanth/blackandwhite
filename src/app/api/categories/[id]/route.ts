import { NextResponse } from "next/server";
import connectDB from "@/lib/db/connectDB";
import CategoryModel from "@/models/Category";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();
  const body = await req.json();
  const updated = await CategoryModel.findByIdAndUpdate(
    params.id,
    { name: body.name },
    { new: true }
  );
  return NextResponse.json(updated);
}

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();
  await CategoryModel.findByIdAndDelete(params.id);
  return NextResponse.json({ message: "Deleted successfully" });
}

import mongoose from "mongoose";
import CategoryModel from "@/models/Category";
import connectDB from "@/lib/db/connectDB";

async function seedCategories() {
  await connectDB();

  const categories = [
    { name: "Clothing" },
    { name: "Footwear" },
    { name: "Accessories" },
    { name: "Electronics" },
  ];

  for (const category of categories) {
    await CategoryModel.findOneAndUpdate({ name: category.name }, category, {
      upsert: true,
      new: true,
    });
  }

  console.log("✅ Categories seeded");
  mongoose.disconnect();
}

seedCategories();
seedCategories().catch((err) => {
  console.error("❌ Seeding error:", err);
  mongoose.disconnect();
});

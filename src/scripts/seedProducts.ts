import mongoose from "mongoose";
import connectDB from "@/lib/db/connectDB";
import ProductModel from "@/models/Product";
import CategoryModel from "@/models/Category";

async function seedProducts() {
  await connectDB();

  const clothing = await CategoryModel.findOne({ name: "Clothing" });
  const electronics = await CategoryModel.findOne({ name: "Electronics" });

  const products = [
    {
      name: "Black T-Shirt",
      description: "Comfortable cotton black t-shirt",
      price: 499,
      discount: 10,
      category: clothing?._id,
      images: ["https://dummyimage.com/600x400/000/fff&text=Black+T-Shirt"],
      stock: 100,
    },
    {
      name: "Smart Watch",
      description: "Bluetooth enabled smart watch",
      price: 2999,
      discount: 20,
      category: electronics?._id,
      images: ["https://dummyimage.com/600x400/123/fff&text=Smart+Watch"],
      stock: 50,
    },
  ];

  for (const product of products) {
    await ProductModel.create(product);
  }

  console.log("✅ Products seeded");
  mongoose.disconnect();
}

seedProducts();

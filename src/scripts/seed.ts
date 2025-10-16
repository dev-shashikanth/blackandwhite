import mongoose from "mongoose";
import { faker } from "@faker-js/faker";
import ProductModel from "@/models/Product";
import connectDB from "@/lib/db/connectDB";

const NUM_PRODUCTS = 20;

async function seedProducts() {
  await connectDB();
  console.log("🌱 Connected to DB");

  await ProductModel.deleteMany({});
  console.log("🗑️ Cleared existing products");

  const fakeProducts = [];

  for (let i = 0; i < NUM_PRODUCTS; i++) {
    const price = parseFloat(faker.commerce.price({ min: 10, max: 500 }));
    const discount = faker.datatype.boolean()
      ? faker.number.int({ min: 5, max: 50 })
      : undefined;

    fakeProducts.push({
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price,
      discount,
      category: new mongoose.Types.ObjectId(), // Add real ones when categories are ready
      images: [faker.image.url()],
      stock: faker.number.int({ min: 0, max: 100 }),
    });
  }

  await ProductModel.insertMany(fakeProducts);
  console.log(`✅ Inserted ${NUM_PRODUCTS} products`);
  mongoose.connection.close();
}

seedProducts().catch((err) => {
  console.error("❌ Seeding error:", err);
  mongoose.connection.close();
});

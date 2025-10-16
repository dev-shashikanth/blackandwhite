// src/seeder/seed.ts
import connectDB from "@/lib/db/connectDB";
import { Seeder } from "mongo-seeding";
import path from "path";
import fs from "fs";

import dotenv from "dotenv";
dotenv.config(); // ✅ This MUST be first before any DB logic

const seed = async () => {
  await connectDB();

  const config = {
    database: process.env.MONGODB_URI,
    dropDatabase: false,
    dropCollections: true,
  };

  const seeder = new Seeder(config);

  const dir = path.resolve(__dirname, "./data");
  console.log("✅ Files in data directory:", fs.readdirSync(dir));

  // ✅ Use this instead:

  const collections = seeder.readCollectionsFromPath(
    path.resolve(__dirname, "./data"),
    {
      extensions: ["json"],
      transformers: [Seeder.Transformers.replaceDocumentIdWithUnderscoreId],
    }
  );

  await seeder.import(collections);

  console.log("✅ Seeding completed");
  process.exit(0);
};

seed().catch((err) => {
  console.error("❌ Seeding error:", err);
  process.exit(1);
});

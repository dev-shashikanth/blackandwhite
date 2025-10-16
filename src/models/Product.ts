import mongoose, { Model, Schema, Document, Types } from "mongoose";

export interface Category extends Document {
  name: string;
  id: string;
}

export interface ProductImage extends Document {
  url: string;
  trim: boolean;
}

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  discount?: number; //Discount in percentage for ex: 10 for 10%
  category: Types.ObjectId; // Optional reference Category
  images: ProductImage[];
  stock: number;
  createdAt: Date;
  updatedAt: Date;
  discountedPrice?: number; //Virtual field
}

const urlRegex = /^(https?:\/\/)?([\w\-]+\.)+[\w\-]+(\/[\w\-./?%&=]*)?$/;

const productSchema: Schema<IProduct> = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0.01, // Enforce a minimum positive price
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category", // Reference the Category model (optional)
    },
    images: [
      {
        type: String,
        trim: true,
        validate: {
          validator: (value: string) => urlRegex.test(value),
          message: (props: any) => `${props.value} is not a valid URL!`,
        },
      },
    ],
    stock: {
      type: Number,
      min: 0, // Enforce non-negative stock
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true }, // Include virtuals when converting to JSON
    toObject: { virtuals: true }, // Include virtuals when converting to Object
  }
);

// ✅ Virtual Field for Discounted Price
productSchema.virtual("discountedPrice").get(function (this: IProduct) {
  if (this.discount) {
    return this.price - (this.price * this.discount) / 100;
  }
  return this.price; // No discount applied
});
// Optional: Add indexes for frequently queried fields (e.g., name, price)
productSchema.index({ name: "text" }); // Full-text search index for name
productSchema.index({ price: 1 }); // Ascending index for price filtering

const ProductModel =
  mongoose.models.Product || mongoose.model<IProduct>("Product", productSchema);

export default ProductModel;

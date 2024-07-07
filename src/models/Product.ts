import mongoose, { Schema } from "mongoose";

interface ProductDocument extends Document {
    stripeId: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
  }
  
  const ProductSchema: Schema = new Schema({
    stripeId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String, required: true },
  });
  
  export default mongoose.models.Product || mongoose.model<ProductDocument>('Product', ProductSchema);
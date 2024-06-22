// src/models/review.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IReview extends Document {
  id: string;
  productId: string;
  userId?: string;
  rating: number;
  comment: string;
  name?: string;
  date: Date;
}

const ReviewSchema: Schema = new Schema({
  productId: { type: String, required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  name: { type: String, default: 'Anônimo' },
  date: { type: Date, default: Date.now },
});

export default mongoose.models.Review || mongoose.model<IReview>('Review', ReviewSchema);

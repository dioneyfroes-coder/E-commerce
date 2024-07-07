// src/models/Order.ts
import mongoose, { Schema, Document } from 'mongoose';

interface OrderDocument extends Document {
  user: mongoose.Schema.Types.ObjectId;
  cartItems: {
    productId: mongoose.Schema.Types.ObjectId;
    quantity: number;
  }[];
  shippingDetails: {
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  status: 'open' | 'paid' | 'shipped' | 'delivered';
}

const OrderSchema: Schema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  cartItems: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true },
    },
  ],
  shippingDetails: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
  },
  status: { type: String, enum: ['open', 'paid', 'shipped', 'delivered'], required: true },
});

export default mongoose.models.Order || mongoose.model<OrderDocument>('Order', OrderSchema);

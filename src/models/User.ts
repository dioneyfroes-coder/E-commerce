// src/models/User.ts

import mongoose, { Document, Model, Schema } from 'mongoose';

interface IUser extends Document {
  clerkId: string;
  email: string;
  firstName?: string;
  lastName?: string;
}

const UserSchema: Schema = new Schema({
  clerkId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  firstName: { type: String },
  lastName: { type: String },
});

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;

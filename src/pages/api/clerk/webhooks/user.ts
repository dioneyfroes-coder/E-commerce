// src/pages/api/clerk/webhooks/user.ts

import { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import User from '../../../../models/User';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await mongoose.connect(process.env.MONGODB_URI as string);

  const { type, data } = req.body;

  if (type === 'user.created') {
    const { id, email_addresses, first_name, last_name } = data;
    const email = email_addresses[0]?.email_address;

    await User.create({
      clerkId: id,
      email,
      firstName: first_name,
      lastName: last_name,
    });
  }

  if (type === 'user.updated') {
    const { id, email_addresses, first_name, last_name } = data;
    const email = email_addresses[0]?.email_address;
console.log("tentando atualizar");
    await User.findOneAndUpdate(
      { clerkId: id },
      {
        email,
        firstName: first_name,
        lastName: last_name,
      }
    );
  }

  if (type === 'user.deleted') {
    const { id } = data;
    await User.findOneAndDelete({ clerkId: id });
  }

  res.status(200).json({ message: 'Webhook handled' });
};

export default handler;

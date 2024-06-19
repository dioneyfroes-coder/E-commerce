// src/pages/api/auth/signup.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { getDatabase } from '../../../lib/mongodb';
import bcrypt from 'bcrypt';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const db = await getDatabase();

  if (req.method === 'POST') {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: 'Email and password are required' });
      return;
    }

    const existingUser = await db.collection('users').findOne({ email });

    if (existingUser) {
      res.status(400).json({ error: 'User already exists' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      email,
      password: hashedPassword,
      createdAt: new Date(),
    };

    const result = await db.collection('users').insertOne(newUser);

    if (result.acknowledged) {
      res.status(201).json({ message: 'User created successfully' });
    } else {
      res.status(500).json({ error: 'Failed to create user' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

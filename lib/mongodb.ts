 import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI!;
const client = new MongoClient(uri);
let db: any;

export const connectToDatabase = async () => {
  if (!db) {
    await client.connect();
    db = client.db('new');
    console.log('✅ Connected to MongoDB');
  }
  return { db };
};

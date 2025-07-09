 //import { MongoClient } from 'mongodb';
 import { MongoClient, Db } from 'mongodb';


const uri = process.env.MONGODB_URI!;
const client = new MongoClient(uri);
//let db: any;
let db: Db;


export const connectToDatabase = async () => {
  if (!db) {
    await client.connect();
    db = client.db('new');
    console.log('✅ Connected to MongoDB');
  }
  return { db };
};

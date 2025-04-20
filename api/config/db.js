import mongoose from 'mongoose';

async function initDB() {
  try {
    // Specify your custom database name
    await mongoose.connect(process.env.MONGO_URI, { dbName: 'shopBilling' });
    console.log("✅ Connected to DB Successfully");
  } catch (error) {
    console.log("❌ Error connecting to DB");
    process.exit(1);
  }
}

export { initDB };

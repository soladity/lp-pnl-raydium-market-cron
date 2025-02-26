import axios from "axios";
import mongoose from "mongoose";
import cron from "node-cron";
import 'dotenv/config'
import { PoolSchema } from "./schema";


// MongoDB Connection
const MONGO_URI = process.env.MONGO_URL
mongoose.connect(MONGO_URI).then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));



const Pool = mongoose.model("Pool", PoolSchema);

// Function to Fetch Raydium Pools
const fetchRaydiumPools = async () => {
  try {
    const response = await axios.get("https://api.raydium.io/v2/main/pairs");
    const pools = response.data;

    console.log(pools[0]);

    for (const pool of pools) {
      await Pool.findOneAndUpdate(
        { id: pool.id },
        { ...pool, updatedAt: new Date() },
        { upsert: true, new: true }
      );
    }

    console.log(`Updated ${pools.length} pools at`, new Date().toISOString());
  } catch (error) {
    console.error("Error fetching Raydium pools:", error);
  }
};

// Schedule Cron Job to Run Every 15 Minutes
cron.schedule("*/15 * * * *", async () => {
  console.log("Fetching Raydium pools...");
  await fetchRaydiumPools();
});

console.log("Raydium pool cron job started.");
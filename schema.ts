import mongoose from "mongoose";


// Define MongoDB Schema & Model
export const PoolSchema = new mongoose.Schema({
  id: String,
  name: String,
  pair_id: String,
  lp_mint: String,
  official: Boolean,
  liquidity: Number,
  market: String,
  volume_24h: Number,
  volume_24h_quote: Number,
  fee_24h: Number,
  fee_24h_quote: Number,
  volume_7d: Number,
  volume_7d_quote: Number,
  fee_7d: Number,
  fee_7d_quote: Number,
  price: Number,
  lp_price: Number,
  amm_id: String,
  token_amount_coin: Number,
  token_amount_pc: Number,
  token_amount_lp: Number,
  apy: Number,
  updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });
import mongoose from "mongoose";

const incomeSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true
  }
});

export default mongoose.model('income', incomeSchema);

import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  latitude: Number,
  longitude: Number,
  type: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Event", eventSchema);

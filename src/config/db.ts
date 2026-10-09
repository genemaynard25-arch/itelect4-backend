import mongoose from "mongoose";

export async function connectDB() {
  const uri = process.env.MONGODB_URI;

  // Fail here, with a sentence, rather than later with a timeout that
  // does not mention .env at all.
  if (!uri) {
    throw new Error(
      "MONGODB_URI is missing. Copy .env.example to .env and fill it in.",
    );
  }

  // Without this, a wrong or unreachable URI sits for ~30 seconds looking
  // like a hung terminal. Five seconds is long enough for a real Atlas
  // connection and short enough to tell you something is wrong.
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
  console.log("MongoDB connected:", mongoose.connection.name);
}

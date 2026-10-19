import "dotenv/config";
import { app } from "./app";
import { connectDB } from "./config/db";

const PORT = Number(process.env.PORT) || 4000;

// // Connect FIRST, then listen, so no request can arrive before the database
// // is reachable.
// connectDB()
//   .then(() => {
//     app.listen(PORT, () =>
//       console.log(`API on http://localhost:${PORT}`),
//     );
//   })
//   .catch((err: unknown) => {
//     console.error("Could not start:", err);
//     process.exit(1);
//   });

connectDB().catch((err: unknown) => {
  // Logged, not exited. On Vercel this file may be the entry point,
  // and killing the process there takes down an instance that was
  // about to answer requests. The failed request says what happened.
  console.error("Could not connect to MongoDB:", err);
});
app.listen(PORT, () => console.log(`API on http://localhost:${PORT}`));


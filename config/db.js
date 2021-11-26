const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

// then/catch
// const connectDB = () => {
//   mongoose
//     .connect(db)
//     .then(() => console.log("Connected to DB..."))
//     .catch((err) => console.error("Could not connect to mongoDB", err.message));
// };

// Async/await
const connectDB = async () => {
  try {
    await mongoose.connect(db);
    console.log("Connected to DB...");
  } catch (err) {
    console.error("Could not connect to mongoDB", err.message);
  }
};

module.exports = connectDB;

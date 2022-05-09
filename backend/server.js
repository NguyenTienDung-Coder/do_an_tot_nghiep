const app = require("./app");
const mongoose = require("mongoose");

const dotenv = require("dotenv");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://hieu:1234@cluster0.4ml7i.mongodb.net/ThucPhamSach?retryWrites=true&w=majority"
  );
  console.log("MongoDB connected");
};

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

connectDB();

//Config
dotenv.config({ path: "backend/config/config.env" });

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`);
});

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});

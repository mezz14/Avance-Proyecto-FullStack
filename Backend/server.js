// ===== CONFIG =====
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// ===== APP =====
const app = express();
const PORT = process.env.PORT || 3000;

// ===== MIDDLEWARE =====
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Servidor vivo 🫀");
});

// ===== ROUTES =====
const authRoutes = require("./routes/auth");
const tareasRoutes = require("./routes/tareas");

app.use("/api/auth", authRoutes);
app.use("/api/tareas", tareasRoutes);

// ===== ERROR HANDLER (SIEMPRE AL FINAL) =====
const errorHandler = require("./middleware/errorHandler");
app.use(errorHandler);

// ===== DATABASE =====
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB conectado"))
    .catch(err => console.log(err));

// ===== SERVER =====
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});

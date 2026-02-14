const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const externalProductsRoutes = require("./routes/externalProducts");

require("dotenv").config();

const authRoutes = require("./routes/auth");
const tareasRoutes = require("./routes/tareas");

const app = express();

// =========================
// MIDDLEWARES
// =========================
app.use(cors());
app.use(express.json());

// =========================
// RUTAS
// =========================
app.use("/api/auth", authRoutes);
app.use("/api/tareas", tareasRoutes);
app.use("/api/external-products", externalProductsRoutes);


// prueba
app.get("/", (req, res) => {
    res.send("api funcionando");
});

// =========================
// SERVER + DB (SOLO SI NO ES TEST)
// =========================
if (process.env.NODE_ENV !== "test") {
    mongoose
        .connect(process.env.MONGO_URI)
        .then(() => {
            console.log("MongoDB conectada 🍃🔥");

            const PORT = 3000;
            app.listen(PORT, () => {
                console.log(`Servidor corriendo en http://localhost:${PORT}`);
            });
        })
        .catch(err => console.error("Error MongoDB 💀", err));
}

// 👇 ESTO ES CLAVE PARA JEST
module.exports = app;

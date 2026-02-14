const express = require("express");
const axios = require("axios");

const router = express.Router();

// GET /api/external-products
router.get("/", async (req, res) => {
    try {
        const response = await axios.get("https://fakestoreapi.com/products");

        res.json(response.data);

    } catch (error) {
        console.error("Error consumiendo Fake Store API:", error.message);
        res.status(500).json({ mensaje: "Error al obtener productos externos" });
    }
});

module.exports = router;

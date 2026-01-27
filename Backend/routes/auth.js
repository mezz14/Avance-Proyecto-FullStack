const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (email === "admin@arte.com" && password === "123456") {
        const token = jwt.sign(
            { email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        return res.json({ token });
    }

    res.status(401).json({ mensaje: "Credenciales incorrectas" });
});

module.exports = router;

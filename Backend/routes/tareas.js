const express = require("express");
const router = express.Router();
const Tarea = require("../models/Tarea");

// GET
router.get("/", async (req, res) => {
    const tareas = await Tarea.find();
    res.json(tareas);
});

// POST
router.post("/", async (req, res) => {
    const tarea = new Tarea({ nombre: req.body.nombre });
    await tarea.save();
    res.json(tarea);
});

// PUT
router.put("/:id", async (req, res) => {
    const tarea = await Tarea.findByIdAndUpdate(
        req.params.id,
        { nombre: req.body.nombre },
        { new: true }
    );
    res.json(tarea);
});

// DELETE
router.delete("/:id", async (req, res) => {
    await Tarea.findByIdAndDelete(req.params.id);
    res.json({ message: "Tarea eliminada" });
});

module.exports = router;

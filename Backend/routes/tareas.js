const express = require("express");
const router = express.Router();
const Tarea = require("../models/Tarea");

// GET /api/tareas
router.get("/", async (req, res, next) => {
    try {
        const tareas = await Tarea.find();
        res.json(tareas);
    } catch (error) {
        next(error);
    }
});

// POST /api/tareas
router.post("/", async (req, res, next) => {
    try {
        const { nombre } = req.body;

        if (!nombre) {
            return res.status(400).json({ message: "El nombre es obligatorio" });
        }

        const nuevaTarea = new Tarea({ nombre });
        await nuevaTarea.save();

        res.status(201).json(nuevaTarea);
    } catch (error) {
        next(error);
    }
});

// PUT /api/tareas/:id
router.put("/:id", async (req, res, next) => {
    try {
        const tarea = await Tarea.findByIdAndUpdate(
            req.params.id,
            { nombre: req.body.nombre },
            { new: true }
        );

        if (!tarea) {
            return res.status(404).json({ message: "Tarea no encontrada" });
        }

        res.json(tarea);
    } catch (error) {
        next(error);
    }
});

// DELETE /api/tareas/:id
router.delete("/:id", async (req, res, next) => {
    try {
        const tarea = await Tarea.findByIdAndDelete(req.params.id);

        if (!tarea) {
            return res.status(404).json({ message: "Tarea no encontrada" });
        }

        res.json({ message: "Tarea eliminada 🗑️" });
    } catch (error) {
        next(error);
    }
});

module.exports = router;

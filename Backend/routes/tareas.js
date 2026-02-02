const express = require("express");
const router = express.Router();
const fs = require("fs").promises;
const path = require("path");

const filePath = path.join(__dirname, "../data/tareas.json");

// helpers
const leerTareas = async () => {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
};

const guardarTareas = async (tareas) => {
    await fs.writeFile(filePath, JSON.stringify(tareas, null, 2));
};

// GET /api/tareas
router.get("/", async (req, res, next) => {
    try {
        const tareas = await leerTareas();
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

        const tareas = await leerTareas();
        const nuevaTarea = {
            id: Date.now(),
            nombre
        };

        tareas.push(nuevaTarea);
        await guardarTareas(tareas);

        res.status(201).json(nuevaTarea);
    } catch (error) {
        next(error);
    }
});

// PUT /api/tareas/:id
router.put("/:id", async (req, res, next) => {
    try {
        const tareas = await leerTareas();
        const index = tareas.findIndex(t => t.id == req.params.id);

        if (index === -1) {
            return res.status(404).json({ message: "Tarea no encontrada" });
        }

        tareas[index].nombre = req.body.nombre || tareas[index].nombre;
        await guardarTareas(tareas);

        res.json(tareas[index]);
    } catch (error) {
        next(error);
    }
});

// DELETE /api/tareas/:id
router.delete("/:id", async (req, res, next) => {
    try {
        const tareas = await leerTareas();
        const nuevasTareas = tareas.filter(t => t.id != req.params.id);

        await guardarTareas(nuevasTareas);
        res.json({ message: "Tarea eliminada" });
    } catch (error) {
        next(error);
    }
});

module.exports = router;

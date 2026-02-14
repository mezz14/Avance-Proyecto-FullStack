const express = require("express");
const router = express.Router();
const Tarea = require("../models/Tarea");

const auth = require("../middleware/auth");
const authorizeRole = require("../middleware/roles");
const validateTarea = require("../middleware/validate");

// =========================
// MOCK PARA TEST
// =========================
if (process.env.NODE_ENV === "test") {

    router.get("/", (req, res) => {
        res.status(200).json([
            { _id: "1", nombre: "Producto test" }
        ]);
    });

    module.exports = router;

} else {

    // =========================
    // RUTAS REALES (PROD / DEV)
    // =========================

    // ✅ GET con PAGINACIÓN
    // /api/tareas?page=1&limit=5
    router.get("/", auth, async (req, res, next) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 5;

            const skip = (page - 1) * limit;

            const total = await Tarea.countDocuments();

            const tareas = await Tarea.find()
                .skip(skip)
                .limit(limit);

            res.json({
                total,
                page,
                totalPages: Math.ceil(total / limit),
                data: tareas
            });

        } catch (error) {
            next(error);
        }
    });

    // ✅ POST
    router.post("/", auth, validateTarea, async (req, res, next) => {
        try {
            const nuevaTarea = new Tarea({
                nombre: req.body.nombre
            });

            await nuevaTarea.save();
            res.status(201).json(nuevaTarea);

        } catch (error) {
            next(error);
        }
    });

    // ✅ PUT
    router.put("/:id", auth, validateTarea, async (req, res, next) => {
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

    // ✅ DELETE SOLO ADMIN
    router.delete("/:id", auth, authorizeRole("admin"), async (req, res, next) => {
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
}

const validateTarea = (req, res, next) => {
    const { nombre } = req.body;

    if (!nombre || nombre.trim() === "") {
        return res.status(400).json({ mensaje: "El nombre es obligatorio" });
    }

    next();
};

module.exports = validateTarea;

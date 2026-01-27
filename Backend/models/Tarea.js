const mongoose = require("mongoose");

const tareaSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    completada: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model("Tarea", tareaSchema);

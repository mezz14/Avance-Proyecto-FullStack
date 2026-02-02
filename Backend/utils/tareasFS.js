const fs = require("fs").promises;
const path = require("path");

const filePath = path.join(__dirname, "../data/tareas.json");

const leerTareas = async () => {
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data);
};

const guardarTareas = async (tareas) => {
  await fs.writeFile(filePath, JSON.stringify(tareas, null, 2));
};

module.exports = { leerTareas, guardarTareas };

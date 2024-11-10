const fs = require("fs").promises;

async function readJsonFile(filePath) {
  try {
    const data = await fs.readFile(filePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    throw new Error("Error al leer el archivo JSON");
  }
}

module.exports = {
  readJsonFile,
};

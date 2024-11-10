var express = require("express");
var router = express.Router();
const XLSX = require("xlsx");
const fs = require("fs");
const path = require("path");

const dateUtils = require("../utils/formatted-date");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource get files");
});

router.post("/upload-excel", function (req, res, next) {
  if (!req.files || !req.files.excelFile) {
    return res.status(400).send("No se ha subido ningun archivo.");
  }

  // Leer el excel
  const excelFile = req.files.excelFile;
  const workbook = XLSX.read(excelFile.data, { type: "buffer" });
  const sheetName = workbook.SheetNames[0];
  const jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

  // Crear carpeta 'static' si no existe
  const staticDir = path.join(__dirname, "../static");
  if (!fs.existsSync(staticDir)) {
    fs.mkdirSync(staticDir);
  }

  const dayFormatted = dateUtils.getFormattedDate();
  const jsonFilePath = path.join(staticDir, `data-${dayFormatted}.json`);

  fs.writeFileSync(jsonFilePath, JSON.stringify(jsonData, null, 2));

  res.send("Archivo JSON generado y guardado en la carpeta 'static'.");
});

module.exports = router;

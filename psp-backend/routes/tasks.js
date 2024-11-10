const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const dateUtils = require("../utils/formatted-date");
const fileUtils = require("../utils/read-json-file");

/* GET users listing. */
router.get("/:name", async function (req, res, next) {
  const paramToFilter = req.params.name.replace(/-/g, " ");
  const dateFormatted = dateUtils.getFormattedDate();
  const jsonFilePath = path.join(
    __dirname,
    "../static",
    `data-${dateFormatted}.json`
  );

  // Leer el archivo .json
  try {
    const jsonData = await fileUtils.readJsonFile(jsonFilePath);

    const dataFiltered = jsonData.filter(
      (element) => element["AUXILIAR"] === paramToFilter
    );

    return res.status(200).json(dataFiltered);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});

module.exports = router;

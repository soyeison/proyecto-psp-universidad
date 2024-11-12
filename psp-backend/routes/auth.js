const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const path = require("path");
const fileUtils = require("../utils/read-json-file");

router.post("/login", async function (req, res, next) {
  const { username, password } = req.body;
  const jsonFilePath = path.join(__dirname, "../static/auth", `users.json`);

  // Comprobar que el password si sea correcto
  try {
    const jsonData = await fileUtils.readJsonFile(jsonFilePath);

    const userFounded = jsonData.find(
      (element) => element["username"] === username
    );

    if (!userFounded) {
      return res.status(404).json({
        data: null,
        message: "El usuario no existe",
      });
    }
    // Comprobar el password
    if (!(await bcrypt.compare(password, userFounded.password))) {
      return res.status(401).json({
        data: null,
        message: "Verificar usuario o contrasena",
      });
    }

    const secret_key = "estaEsUnaK3y";
    const token = jwt.sign({ username }, secret_key, { expiresIn: "1h" });

    return res.status(200).json({
      data: {
        username,
        access_token: "Bearer " + token,
      },
      message: "Usuario encontrado correctamente",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});

module.exports = router;

/* eslint-disable @typescript-eslint/no-require-imports */
const crypto = require("crypto");

// Generar una clave secreta de 32 bytes
const secret = crypto.randomBytes(32).toString("base64");

console.log(secret);

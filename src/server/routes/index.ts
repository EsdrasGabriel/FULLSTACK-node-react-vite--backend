import { Router } from "express";
import { StatusCodes } from "http-status-codes";

import { cidadesController, } from "./../controllers";

const router = Router();

router.get("/", (req, res) => {
  return res.send("Olá Dev!");
});

router.post(
  "/cidades",
  cidadesController.create   
);

export { router };

const express = require("express");

const PersonController = require("../controllers/mascota.controller");

const PersonRouter = express.Router();

//esto parte de la ruta base /api/mascota
PersonRouter.post("/", PersonController.createNewPerson);
PersonRouter.get("/", PersonController.getAllPersons);
PersonRouter.get("/:id", PersonController.getOnePersonById);
PersonRouter.put("/:id", PersonController.updateOnePersonById);

module.exports = PersonRouter;
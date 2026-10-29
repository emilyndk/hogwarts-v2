import express from "express";
import * as housesController from "../controllers/houses.controller.js";

const router = express.Router();

router.get("/", housesController.getAllHouses);
router.get("/:id", housesController.getSingleHouse);

export default router;

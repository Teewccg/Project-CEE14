import express from "express";

import * as playerController from "../controllers/playerControllers.js";


const router = express.Router();

router.get("/", playerController.getPlayer);
router.get("/:id", playerController.getIndividualPlayers);
router.post("/", playerController.createPlayer);
router.delete("/:id", playerController.deletePlayer);
router.put("/:id", playerController.updateScore);
router.put("/:id", playerController.movePlayer);

export default router;
import express from "express";

import * as playerController from "../controllers/playerControllers.js";


const router = express.Router();

router.get("/", playerController.getPlayer);
router.post("/", playerController.createPlayer);
router.delete("/:id", playerController.deletePlayer);
router.put("/:id", playerController.updateScore);
router.put("/:id", playerController.updatePlayer);

export default router;
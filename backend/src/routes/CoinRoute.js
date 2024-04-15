import express from "express";

import * as coinController from "../controllers/coinControllers.js";

const router = express.Router();

router.get("/", coinController.getCoins);
router.post("/", coinController.createCoin);
router.delete("/:id", coinController.deleteCoin);

export default router;
import express from "express";

import * as coinControllers from "../controllers/coinControllers.js";

const router = express.Router();

router.get("/", coinControllers.getCoins);
router.post("/", coinControllers.createCoin);
router.delete("/:id", coinControllers.deleteCoin);

export default router;
import { Router } from "express";
import { DetallePedidoController } from "../controllers/DetallePedidoController.js";

const router = Router();

router.get("/", DetallePedidoController.getAll);

router.post("/", DetallePedidoController.create);

export default router;
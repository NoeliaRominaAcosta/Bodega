import { Router } from 'express';
import { EnvioController } from '../controllers/EnvioController.js';

const router = Router();

router.get('/', EnvioController.getAll);
router.get('/:id', EnvioController.getById);
router.post('/', EnvioController.create);
router.patch('/:id/despachar', EnvioController.despachar);
router.patch('/:id/entregar', EnvioController.entregar);

export default router;

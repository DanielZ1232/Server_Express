import { Router } from 'express';
import { deleteUsuario, getUsuarios, getUsuario, postUsuario, putUsuario } from '../controllers/usuarios';

const router = Router();

router.get('/', getUsuarios);
router.get('/:id', getUsuario);
router.post('/', postUsuario);
router.put('/:id', putUsuario);
router.delete('/:id', deleteUsuario);

export default router;
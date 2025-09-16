import express from 'express';

import {
    crearEmpresa,
    consultaNombreEmpresa
} from '../controllers/empresa.controllers';

const router = express.Router();

router.post('/', crearEmpresa);

router.get('/:id', consultaNombreEmpresa);

export default router;
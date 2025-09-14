import express from 'express';

import {
    crearEmpresa
} from '../controllers/empresa.controllers';

const router = express.Router();

router.post('/', crearEmpresa);

export default router;
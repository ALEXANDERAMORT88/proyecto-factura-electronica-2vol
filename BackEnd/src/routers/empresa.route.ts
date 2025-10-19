import express from 'express';

import {
    crearEmpresa,
    consultaNombreEmpresa,
} from '../controllers/empresa.controllers';

import {loginEmpresa } from '../controllers/loginEmpresa.controllers';

const router = express.Router();

router.post('/', crearEmpresa);

router.get('/:id', consultaNombreEmpresa);

router.post('/login',loginEmpresa )

export default router;
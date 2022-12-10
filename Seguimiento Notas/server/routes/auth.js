const { check } = require('express-validator');
const { Login, Signup, renewToken } = require("../controllers/controller-auth");
const { Router } = require("express");
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post('/login',
    [
        check('pass', 'La contraseña es obligatoria').not().isEmpty().isLength({ min: 6 }),
        check('user', 'El nombre de usuario es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    Login
);

router.post('/signup',
    [
        check('pass', 'La contraseña es obligatoria').not().isEmpty().isLength({ min: 6 }),
        check('documento', 'El número de documento es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    Signup
);

router.get('/renew', validarJWT, renewToken);

module.exports = router;
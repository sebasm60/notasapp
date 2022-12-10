const { add, update, list, search } = require("../controllers/controller-grupoGrado");
const { Router } = require("express");
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post('/add', validarJWT, add);
router.put('/update', validarJWT, update);
router.get('/list', validarJWT, list);
router.get('/search', validarJWT, search);

module.exports = router;
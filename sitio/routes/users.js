var express = require('express');
var router = express.Router();
const controller = require("../controllers/userController");
const userController = require('../controllers/userController');
const { check } = require('express-validator');

router.get("/", controller.login) // utilizo el metodo listar de productsController despues vamos a usercontroller para crear el metodo
router.get("/registrarme", controller.registro) // utilizo el metodo listar de productsController
router.post("/registrarme", controller.crear) // utilizo el metodo listar de productsController
router.get('/Administrador', controller.productosAdmin)
    /*Agrego login */
router.get('/login', userController.login);
router.post('/login', [
    //Chequeamos q sea un email y que sea un email
    check('email').isEmail().withMessage('Email invalido'),
    //chequeamos q sea una contraseña de 10 caracteres maximo
    check('password').isLength({ min: 10 }).withMessage('la contraseña debe tener al menos 10 caracteres'), userController.ProcessLogin
]) /*ahora vamos a (userController/processLogin) */
module.exports = router;
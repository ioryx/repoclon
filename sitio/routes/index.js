const express = require("express");
const router = express.Router();
const controller = require("../controllers/indexController")

router.get("/", controller.home) // utilizo el metodo listar de productsController
router.get('/pruebaSession', function(req, res) {
    if (req.session.numeroVisitas == undefined) {
        req.session.numeroVisitas = 0;
    }
    req.session.numeroVisitas++;
    res.send('Session tiene el numero: ' + req.session.numeroVisitas)

});
module.exports = router;
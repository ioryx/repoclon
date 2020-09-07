const bcrypt = require("bcrypt");
const dbUser = require("../data/userDataBase");
const dbProduct = require("../data/database");
const fs = require("fs");
const { validationResult } = require("express-validator");

module.exports = {

    registro: function(req, res, next) {

        res.render('registroUsuario', {
            css: "style",
            title: "Registro"
        });
    },
    /*para crear el metodo (login) que va a ser una funcion que va a tener un res y un res que va a retornar una vista
    que se va a llamar login luego se va (view) para culminar las vistas(login.ejs) */
    login: function(req, res, next) {

        res.render('login', {
            css: "login",
            title: "Inicio de sesion"
        });
    },
    /*agrego processLogin */
    processLogin: function(res, res) {
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            /*agregar si el usuario existe y la contraseña es correcta */
            let usersJSON = fs.readFileSync('/data/user.json', { email });
            let users;
            if (usersJSON == "") {
                user = [];
            } else {
                users = JSON.parse(usersJSON);
            }
            for (let i = 0; i < users.length; i++) {
                if (users[i].email == req.body.email) {
                    if (bcrypt.compareSync(req.body.contraseña, users[i].contraseña)) {
                        let usuarioAloguearse = users[i];
                        break;
                    }
                }
            }
            if (usuarioAloguearse == undefined) {
                return res.render('login', {
                    errors: [
                        { msg: 'Credenciales invalidas' }
                    ]
                });
            }
            req.session.usuarioAloguearse = usuarioAloguearse;
            res.render('success bienvenido a tu pagina');
        } else {
            return res.render('login', { errors: errors.errors });
        }
    },
    /*store:function(res, req){
        let errors = validationResult(req);
        
    }*/
    /*agregue hasta aca cualquier cosa :) */
    crear: function(req, res, next) {

        let ultimoId = 0;
        dbUser.forEach(user => {
            if (user.id > ultimoId) {
                ultimoId = user.id;
            }
        });
        /*agrego variable userJSON si no sirve sacar :´´) */

        let usuario = {
            id: ultimoId + 1,
            nombre: req.body.nomnbre,
            apellido: req.body.apellido,
            domicilio: req.body.calle + " " + req.body.numero,
            detalle: req.body.detalle,
            Localidad: req.body.localidad,
            email: req.body.email,
            contraseña: bcrypt.hashSync(req.body.contraseña, 10), //encripto la contraseña
            categoria: req.body.categoty,
            image: "",
        }

        dbUser.push(usuario);
        fs.writeFileSync("./data/users.json", JSON.stringify(dbUser))
        res.redirect("/")
    },
    productosAdmin: (req, res, next) => {
        let categorias = [];
        let productos = [];
        let seccion;

        dbProduct.forEach(producto => {
            if (!categorias.includes(producto.category)) {
                categorias.push(producto.category)
            }
        })


        categorias.forEach(categoria => {
            seccion = dbProduct.filter(producto => {
                return producto.category == categoria
            })
            productos.push({
                categoria: categoria,
                productos: seccion
            });
        })
        res.render('productosAdministrador', {
            css: "productosAdmin",
            title: "Productos Administrador",
            productos: productos,
        })
    }
}
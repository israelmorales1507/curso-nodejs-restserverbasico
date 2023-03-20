const { response } = require("express");
const Usuario = require("../models/usuario");
const bcryptjs = require("bcryptjs");

const usuariosGet = async(req, res = response) => {
    const {limit=5, offset=0} = req.query;
    const query = {estado: true};

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query).skip(offset)
                        .limit(limit),
    ]);

    res.status(200).json({
        total, 
        usuarios,
    });
}

const usuarioPut = async (req, res) => {
    const { id } = req.params;
    const { __id, password, google, correo,...resto } = req.body;

    //TODO Validar contra db.
    if (password) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.status(200).json({
        msg: "put api",
        usuario
    });
}

const usuarioPost = async (req, res) => {
    const { nombre, correo, rol, password } = req.body;
    const usuario = new Usuario({ nombre, correo, rol, password });

    //verificar si el correo exites
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        return res.status(400).json({
            msj: "El correo ya esta registrado"
        });
    }

    //encriptar password
    var salt = bcryptjs.genSaltSync(10);
    usuario.password = bcryptjs.hashSync(password, salt);

    //guardar en db
    await usuario.save();

    res.status(200).json({
        msg: "post api",
        usuario
    });
}

const usuarioDelete = async(req, res) => {
    const {id} = req.params;

    //Delete fisicamente
    //const usuario = await Usuario.findByIdAndDelete(id);
    
    const usuario = await Usuario.findByIdAndUpdate(id,{estado:false});
    res.status(200).json({
        msg: "delete api",
        id,
        usuario
    });
}

const usuarioPatch = (req, res) => {
    res.status(403).json({
        msg: "patch api"
    });
}
module.exports = {
    usuariosGet,
    usuarioPut,
    usuarioPost,
    usuarioDelete,
    usuarioPatch,
}
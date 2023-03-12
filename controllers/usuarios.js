const { response } = require("express");

const usuariosGet = (req, res = response) => {
    const body = req.body;
    const query = req.query;
    res.status(403).json({
        msg: "get api - controller",
        body,
        query
    });
}

const  usuarioPut = (req, res) => {
    const id = req.params.id;
    res.status(403).json({
        msg: "put api",
        id
    });
}

const usuarioPost= (req, res) => {
    res.status(403).json({
        msg: "post api",
    });
}

const usuarioDelete = (req, res) => {
    res.status(403).json({
        msg: "delete api",
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
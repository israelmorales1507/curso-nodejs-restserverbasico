const role = require("../models/role");
const usuario = require("../models/usuario");

const isRoleValido = async(rol = "") => {
    const existeRol = await role.findOne({role: rol});
    if(!existeRol){
        throw new Error(`El rol ${rol} no esta registrado en la db`);
    }
}

const existEmail = async(correo = "") => {
    const existeEmail = await usuario.findOne({correo});
    if (existeEmail) {
        throw new Error(`El correo ${correo} ya existe...`);
    }
}

const existsUsuarioById = async(id)=>{
    const existeUsuario = await usuario.findById(id);
    if (!existeUsuario) {
        throw new Error(`El id ${id} no existe...`);
    }
}
module.exports = {
    isRoleValido,
    existEmail,
    existsUsuarioById,
};
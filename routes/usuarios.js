const { Router } = require("express");
const { check } = require("express-validator");
const { usuariosGet,
    usuarioPut,
    usuarioPost,
    usuarioDelete,
    usuarioPatch
} = require("../controllers/usuarios");
const { isRoleValido, existEmail, existsUsuarioById } = require("../helpers/db-validator");
const validarCompos = require("../middlewares/validar-campos");
const role = require("../models/role");

const router = Router();

router.get("/", usuariosGet);

router.put("/:id", [
    check("id", "No es un id valido...").isMongoId(),
    check("id").custom(existsUsuarioById),
    check("rol").custom(isRoleValido),
    validarCompos,
], usuarioPut);

router.post("/", [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El password debe de ser mas de 6 letras").isLength({ min: 6 }),
    check("correo", "El correo no es valido").isEmail(),
    check("correo").custom(existEmail),
    check("rol").custom(isRoleValido),
    validarCompos,
], usuarioPost);

router.delete("/:id",[
    check("id", "No es un id valido...").isMongoId(),
    check("id").custom(existsUsuarioById),
    validarCompos,
],usuarioDelete);

router.patch("/", usuarioPatch);

module.exports = router;
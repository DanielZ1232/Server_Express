"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUsuario = exports.putUsuario = exports.postUsuario = exports.getUsuario = exports.getUsuarios = void 0;
const usuarios_1 = __importDefault(require("../models/usuarios")); // Asegúrate de que tengas definido el modelo Usuario
// Obtener todos los usuarios
const getUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usuarios = yield usuarios_1.default.findAll();
        res.json(usuarios);
    }
    catch (error) {
        res.status(500).json({
            msg: 'Error al obtener los usuarios',
            error
        });
    }
});
exports.getUsuarios = getUsuarios;
// Obtener un usuario por ID
const getUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const usuario = yield usuarios_1.default.findByPk(id);
        if (!usuario) {
            return res.status(404).json({
                msg: `No se encontró un usuario con el ID ${id}`
            });
        }
        res.json(usuario);
    }
    catch (error) {
        res.status(500).json({
            msg: 'Error al obtener el usuario',
            error
        });
    }
});
exports.getUsuario = getUsuario;
// Crear un nuevo usuario
const postUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, apellido, correo } = req.body;
    try {
        const nuevoUsuario = yield usuarios_1.default.create({ nombre, apellido, correo });
        res.status(201).json(nuevoUsuario);
    }
    catch (error) {
        res.status(500).json({
            msg: 'Error al crear el usuario',
            error
        });
    }
});
exports.postUsuario = postUsuario;
// Actualizar un usuario por ID
const putUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { nombre, apellido, correo } = req.body;
    try {
        const usuario = yield usuarios_1.default.findByPk(id);
        if (!usuario) {
            return res.status(404).json({
                msg: `No se encontró un usuario con el ID ${id}`
            });
        }
        yield usuario.update({ nombre, apellido, correo });
        res.json(usuario);
    }
    catch (error) {
        res.status(500).json({
            msg: 'Error al actualizar el usuario',
            error
        });
    }
});
exports.putUsuario = putUsuario;
// Eliminar un usuario por ID
const deleteUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const usuario = yield usuarios_1.default.findByPk(id);
        if (!usuario) {
            return res.status(404).json({
                msg: `No se encontró un usuario con el ID ${id}`
            });
        }
        yield usuario.destroy();
        res.json({
            msg: 'Usuario eliminado correctamente'
        });
    }
    catch (error) {
        res.status(500).json({
            msg: 'Error al eliminar el usuario',
            error
        });
    }
});
exports.deleteUsuario = deleteUsuario;

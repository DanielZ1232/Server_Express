import { Request, Response } from 'express';
import Usuario from '../models/usuarios'; // Asegúrate de que tengas definido el modelo Usuario

// Obtener todos los usuarios
export const getUsuarios = async (req: Request, res: Response) => {
    try {
        const usuarios = await Usuario.findAll();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({
            msg: 'Error al obtener los usuarios',
            error
        });
    }
};

// Obtener un usuario por ID
export const getUsuario = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({
                msg: `No se encontró un usuario con el ID ${id}`
            });
        }
        res.json(usuario);
    } catch (error) {
        res.status(500).json({
            msg: 'Error al obtener el usuario',
            error
        });
    }
};

// Crear un nuevo usuario
export const postUsuario = async (req: Request, res: Response) => {
    const { nombre, apellido, correo } = req.body;

    try {
        const nuevoUsuario = await Usuario.create({ nombre, apellido, correo });
        res.status(201).json(nuevoUsuario);
    } catch (error) {
        res.status(500).json({
            msg: 'Error al crear el usuario',
            error
        });
    }
};

// Actualizar un usuario por ID
export const putUsuario = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { nombre, apellido, correo } = req.body;

    try {
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({
                msg: `No se encontró un usuario con el ID ${id}`
            });
        }

        await usuario.update({ nombre, apellido, correo });
        res.json(usuario);
    } catch (error) {
        res.status(500).json({
            msg: 'Error al actualizar el usuario',
            error
        });
    }
};

// Eliminar un usuario por ID
export const deleteUsuario = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({
                msg: `No se encontró un usuario con el ID ${id}`
            });
        }

        await usuario.destroy();
        res.json({
            msg: 'Usuario eliminado correctamente'
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Error al eliminar el usuario',
            error
        });
    }
};

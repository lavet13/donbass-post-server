import { db } from '../models';
import { Op } from 'sequelize';
const Tutorial = db.tutorials;
export const create = async (req, res) => {
    if (!req.body.title) {
        res.status(400).send({
            message: 'Content can not be empty!',
        });
        return;
    }
    const tutorial = {
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false,
    };
    try {
        const responseData = await Tutorial.create(tutorial);
        res.send(responseData);
    }
    catch (err) {
        res.status(500).send({
            message: err.message || 'some error occurred while creating the Tutorial.',
        });
    }
};
export const findAll = async (req, res) => {
    const title = req.query.title;
    const condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
    try {
        const responseData = await Tutorial.findAll({ where: condition });
        res.send(responseData);
    }
    catch (err) {
        res.status(500).send({
            message: err.message || 'Some error occurred while retrieving tutorials.',
        });
    }
};
export const findOne = async (req, res) => {
    const id = req.params.id;
    try {
        const responseData = await Tutorial.findByPk(id);
        if (responseData) {
            res.send(responseData);
        }
        else {
            res.status(404).send({ message: `Cannot find Tutorial with id=${id}` });
        }
    }
    catch (err) {
        res.status(500).send({
            message: err.message || `Error retrieving Tutorial with id=${id}`,
        });
    }
};
export const update = async (req, res) => {
    const id = req.params.id;
    try {
        const num = await Tutorial.update(req.body, { where: { id: id } });
        if (num === 1) {
            res.send({
                message: 'Tutorial was updated successfully.',
            });
        }
        else {
            res.send({
                message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`,
            });
        }
    }
    catch (err) {
        res.status(500).send({
            message: `Error updating Tutorial with id=${id}`,
        });
    }
};
export const deleteOne = async (req, res) => {
    const id = req.params.id;
    try {
        const num = await Tutorial.destroy({ where: { id: id } });
        if (num === 1) {
            res.send({
                message: 'Tutorial was deleted successfully!',
            });
        }
        else {
            res.send({
                message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`,
            });
        }
    }
    catch (err) {
        res.status(500).send({
            message: `Could not delete Tutorial with id=${id}`,
        });
    }
};
export const deleteAll = async (req, res) => {
    try {
        const nums = await Tutorial.destroy({ where: {}, truncate: false });
        res.send({
            message: `${nums} Tutorials were deleted successfully.`,
        });
    }
    catch (err) {
        res.status(500).send({
            message: err.message || `Some error occurred while removing all tutorials.`,
        });
    }
};
export const findAllPublished = async (req, res) => {
    try {
        const responseData = await Tutorial.findAll({ where: { published: true } });
        res.send(responseData);
    }
    catch (err) {
        res.status(500).send({
            message: err.message || `Some error occurred while retrieving tutorials.`,
        });
    }
};

import Todos from "../models/Todos.js";
import crypto from "node:crypto";


export const listTodos = async (req, res) => {
    try {
        const todos = await Todos.findAll();

        res.status(200).json(todos);
    } catch(err) {
        res.status(500).json(err);
    }
};

export const createTodo = async (req, res) => {
    try {
        const todoToCreate = {
            id: crypto.randomUUID(),
            ...req.body,
        };
        const todo = await Todos.create(todoToCreate);

        res.status(201).json(todo);
    } catch(err) {
        res.status(500).json(err);
    }
    
};

export const updateTodo = async (req, res) => {
    try {
        const [updateTodo] = await Todos.update(
            req.body,
            {
                where: { id: req.params.id}
            }
        );

        if (updateTodo === 0) {
            return res.status(404).json({ message: "TODO não encontrado!" });
        }

        const updatedTodo = await Todos.findByPk(req.params.id);
    
        res.status(200).json(updatedTodo);
    } catch(err) {
        res.status(500).json(err);
    }
    
};

export const deleteTodo = async (req, res) => {
    try {
        const todo = await Todos.destroy({
            where: { id: req.params.id}
        });

        res.status(204).json();
    } catch(err) {
        res.status(500).json(err);
    }
};

export const statusTodo = async (req, res) => {
    try {
        const todo = await Todos.findByPk(req.params.id);

        if(!todo) {
            return res.status(404).json({ message: "TODO não encontrado!"});
        }

        todo.status = !todo.status;

        await todo.save();

        res.status(200).json(todo);
    } catch(err) {
        res.status(500).json(err);
    }
};

export const validateTodo = (req, res, next) => {
    const { title } = req.body;

    if (!title || title.trim() === "") {
        return res.status(400).json({ message: "Title é obrigatório" });
    }

    next();
}
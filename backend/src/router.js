import express from "express";
import { createTodo, listTodos, deleteTodo, updateTodo, statusTodo, validateTodo } from "./controllers/todosController.js";

const router = express.Router();

router.get("/listar", listTodos);
router.post("/cadastro", validateTodo, createTodo);
router.put("/atualizar/:id", validateTodo, updateTodo);
router.delete("/deletar/:id", deleteTodo);
router.patch("/status/:id", statusTodo);

export default router;
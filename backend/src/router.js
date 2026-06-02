import express from "express";
import { createTodo, listTodos, deleteTodo, updateTodo, toggleTodoStatus, validateTodo } from "./controllers/todosController.js";

const router = express.Router();

router.get("/todos", listTodos);
router.post("/todos", validateTodo, createTodo);
router.put("/todos/:id", validateTodo, updateTodo);
router.delete("/todos/:id", deleteTodo);
router.patch("/todos/:id", toggleTodoStatus);

export default router;
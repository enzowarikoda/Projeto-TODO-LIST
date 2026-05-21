import express from "express";

const router = express.Router();

const todos = [];

let novoId = 1;

router.get("/todos", (req, res) => {
  res.json(todos);
});

router.post('/todos', (req, res) => {
  const { descricao } = req.body;

  const novoTodo = {
    id: novoId++,
    descricao,
    status: false
  };

  todos.push(novoTodo);
  res.status(201).json(novoTodo);
});

router.put("/todos/:id", (req, res) => {
  const id = Number(req.params.id);

  const existeTodo = todos.find((todo) => todo.id === id);

  if(!existeTodo) {
    return res.status(404).send("TODO não encontrado!");
  }

  const novoTodo = req.body;

  const index = todos.findIndex((todo) => todo.id === id);

  todos[index] = {
    ...todos[index],
    ...novoTodo,
    id,
  };

  res.json(todos[index]);
})

router.delete("/todos/:id", (req, res) => {
  const id = Number(req.params.id);

  const index = todos.findIndex((todo) => todo.id === id);

  if (index === -1) {
    return res.status(404).send("TODO não encontrado!");
  }

  todos.splice(index, 1);

  res.json({
    mensagem: "TODO deletado com sucesso!",
  });
})

export default router;
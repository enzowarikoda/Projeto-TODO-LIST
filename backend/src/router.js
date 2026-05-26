import express from "express";

const router = express.Router();

const todos = [];

let newId = 1;

router.get("/todos", (req, res) => {
  res.status(200).json(todos);
});

router.post('/todos', (req, res) => {
  const { title } = req.body;

  const newTodo = {
    id: newId++,
    title,
    status: false
  };

  todos.push(newTodo);
  res.status(201).json(newTodo);
});

router.put("/todos/:id", (req, res) => {
  const id = Number(req.params.id);

  const existsTodo = todos.find((todo) => todo.id === id);

  if(!existsTodo) {
    return res.status(404).send("TODO não encontrado!");
  }

  const newTodo = req.body;

  const index = todos.findIndex((todo) => todo.id === id);

  todos[index] = {
    ...todos[index],
    ...newTodo,
    id,
  };

  res.status(201).json(req.body);
})

router.delete("/todos/:id", (req, res) => {
  const id = Number(req.params.id);

  const index = todos.findIndex((todo) => todo.id === id);

  if (index === -1) {
    return res.status(404).send("TODO não encontrado!");
  }

  todos.splice(index, 1);

  res.status(200).json({
    message: 'TODO deletado com sucesso!'
  });
})

export default router;
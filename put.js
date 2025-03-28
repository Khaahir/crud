import express from "express";
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(express.json());

const todos = [
  { id: 1, todo: "Eat cereal" },
  { id: 2, todo: "Walk the dog" },
  { id: 3, todo: "Do homework" },
  { id: 4, todo: "Clean the desk" },
  { id: 5, todo: "Write a blog post" },
  { id: 6, todo: "Read a book" },
  { id: 7, todo: "Check emails" },
  { id: 8, todo: "Call mom" },
  { id: 9, todo: "Update Linux" },
  { id: 10, todo: "Play a game" },
];

app.get("/api/todos", (req, res) => {
  res.json(todos);
});

app.put("/api/put/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { todo } = req.body;

  const index = todos.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(400).json({
      Message: "no todo with that ID",
      success: false,
    });
  }
  todos[index].todo = todo;
  res.json({ success: true, Message: "todo Updated" });
});

const port = process.env.port || 4001;

app.listen(port, () => {
  console.log(`Server started on  http://localhost:${port}/api/todos`);
});

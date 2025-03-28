import express from "express";
import dotenv from "dotenv";
dotenv.config();
const app = express();

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

app.patch("");

const port = process.env.port || 4001;

app.listen(port, () => {
  console.log(`server startad http://localhost:${port}/api/patch`);
});

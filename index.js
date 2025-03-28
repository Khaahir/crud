import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(express.json());

const checkKey = (req, res, next) => {
  const key = req.headers.authorization;
  if (key === "hemligt") {
    next();
  } else {
    return res.status(400).json({
      Message:
        "you need a token to change in the program, ps Ask your boss .....",
      Success: false,
    });
  }
};

const users = [
  {
    id: 1,
    name: "Alice Andersson",
    email: "alice@example.com",
    isAdmin: true,
  },
  {
    id: 2,
    name: "Bob Berg",
    email: "bob@example.com",
    isAdmin: false,
  },
  {
    id: 3,
    name: "Carla Carlsson",
    email: "carla@example.com",
    isAdmin: false,
  },
  {
    id: 4,
    name: "David Dahl",
    email: "david@example.com",
    isAdmin: true,
  },
  {
    id: 5,
    name: "Eva Ek",
    email: "eva@example.com",
    isAdmin: false,
  },
];

app.get("/api/users", (req, res) => {
  res.json({ users });
});

app.get("/api/user/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find((item) => item.id === id);

  if (!user) {
    return res.status(400).json({ Message: "no user with that id" });
  }

  res.status(200).json({ success: true, user });
});

app.post("/api/user", checkKey, (req, res) => {
  const { id, name, isAdmin, email } = req.body;
  if (
    typeof id !== "number" ||
    typeof name !== "string" ||
    typeof isAdmin !== "boolean" ||
    typeof email !== "string"
  ) {
    return res.status(400).json({
      status: "failed",
      Message:
        "you are missing some inputs, be sure u have the right syntax and inputs",
    });
  }

  const newUser = { id, name, isAdmin, email };
  users.push(newUser);

  res.status(201).json({
    Status: "success",
    Message: " you created a new user,",
    newUser,
  });
});

app.put("/api/user/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const { id, name, isAdmin, email } = req.body;

  const index = users.findIndex((item) => item.id === userId);

  if (index === -1) {
    return res
      .status(400)
      .json({ Message: "there is no id with that value", success: false });
  }

  users[index] = { id, name, isAdmin, email };
  res.status(200).json({ success: true, message: "updated user", users });
});

app.patch("/api/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const { id, name, isAdmin, email } = req.body;

  const index = users.findIndex((item) => item.id === userId);

  if (index === -1) {
    return res
      .status(400)
      .json({ Success: false, Message: "there is no id with that value" });
  }

  if (id !== undefined) users[index].id = id;
  if (name !== undefined) users[index].name = name;
  if (isAdmin !== undefined) users[index].isAdmin = isAdmin;
  if (email !== undefined) users[index].email = email;

  res
    .status(201)
    .json({ success: true, Message: "user updated", id, name, isAdmin, email });
});

app.delete("/api/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);

  const index = users.findIndex((item) => item.id === userId);

  if (index === -1) {
    return res
      .status(400)
      .json({ Message: "Here is no id with that value", success: false });
  }

  users.splice(index, 1);

  res.status(200).json({ Message: `the user ${index} was deleted` });
});

const port = process.env.port || 4000;

app.listen(port, () => {
  console.log(`started on http://localhost:${port}/api/users`);
});

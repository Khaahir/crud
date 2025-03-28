import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(express.json());

app.get("/api/status", (request, response) => {
  return response.status(200).json({ Status: "OK" });
});

app.get("/api/greet", (request, response) => {
  const name = request.query.name;
  response.json({ Message: `Hejsan ${name}` });
});

const port = process.env.port || 4001;

app.listen(port, () => {
  console.log(
    `servern har startat på ${port} klicka här för att komma dit..... http://localhost:${port}/api/status`
  );
});

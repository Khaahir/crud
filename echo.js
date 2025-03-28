import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(express.json());

app.get("/api/headers", (req, res) => {
  res.json({ headers: req.headers });
});

const port = process.env.port || 4001;

app.listen(port, () => {
  console.log(
    `servern har startat på ${port} klicka här för att komma dit..... http://localhost:${port}/api/headers`
  );
});

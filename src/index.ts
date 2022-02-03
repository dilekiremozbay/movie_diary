import "reflect-metadata";
import "dotenv/config";
import path from "path";
import express from "express";
import * as ejs from "ejs";
import { Request, Response } from "express";

//---------Init Express App--------
const app = express();

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

//---------Middlewares--------------
app.use(express.static("public"));
app.use("/public", express.static("public"));

// for parsing application/json
app.use(express.json());

const port = 3001;

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı`);
});

app.get("/", (req, res) => {
  res.render("mainpage");
});

app.get("/error", (req: Request, res: Response) => {
  res.render("erroring");
});

app.get("/recommendation", (req: Request, res: Response) => {
  res.render("recommendation");
});

app.get("/login", (req: Request, res: Response) => {
  res.render("login");
});

app.get("/publicdiary", (req: Request, res: Response) => {
  res.render("publicdiary");
});

app.get("/profile", (req: Request, res: Response) => {
  res.render("profile");
});

app.get("/register", (req: Request, res: Response) => {
  res.render("register");
});

app.get("/secretdiary", (req: Request, res: Response) => {
  res.render("secretdiary");
});

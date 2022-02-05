import "reflect-metadata";
import "dotenv/config";
import path from "path";
import express from "express";
import * as ejs from "ejs";
import { Request, Response } from "express";
import { createConnection } from "typeorm";
import * as bodyParser from "body-parser";
import { registerRoutes } from "./routes";
import { Photo } from "./entity/photo";
import { create } from "domain";
import MySQLStore from "express-mysql-session";
import { resolve } from "path/posix";
import { appendFile } from "fs";
import { User } from "./entity/User";
import { PhotoController } from "./controllers/photoController";
import { BaseEntity } from "typeorm";
import { request } from "http";
import { getRepository } from "typeorm";
import fileUpload from "express-fileupload";

//---------Init Express App--------
const app = express();

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

//---------Middlewares--------------
app.use(express.static("public"));
app.use("/public", express.static("public"));

// for parsing application/json
app.use(bodyParser.json());
// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//routes

app.use(fileUpload());

registerRoutes(app);

//chrnological order of posts
app.get("/main", async (req, res) => {
  const photos = await Photo.find({
    order: {
      id: "DESC",
      createdAt: "DESC",
    },
  });
  res.render("mainpage", {
    photos,
  });
});

createConnection()
  .then(() => {
    const port = 3000;

    app.listen(port, () => {
      console.log(`Sunucu ${port} portunda başlatıldı`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

import "reflect-metadata";
import "dotenv/config";
import express from "express";
import * as bodyParser from "body-parser";
import fileUpload from "express-fileupload";
import { createConnection } from "typeorm";
import { registerRoutes } from "./routes";
import{Request,Response} from "express";

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

app.use(fileUpload());

//registerRoutes(app);

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

app.get("/movie-add", (req: Request, res: Response) => {
  res.render("movie-add");
});

app.get("/movies-and-artists", (req: Request, res: Response) => {
  res.render("movies-and-artists");
});

app.get("/star-add", (req: Request, res: Response) => {
  res.render("star-add");
});

app.get("/star-detail", (req: Request, res: Response) => {
  res.render("star-detail");
});

app.get("/movie-detail", (req: Request, res: Response) => {
  res.render("movie-detail");
});

app.get("/about", (req: Request, res: Response) => {
  res.render("about");
});

app.get("/404", (req: Request, res: Response) => {
  res.render("404");
});

app.get("/movies-and-stars", (req: Request, res: Response) => {
  res.render("movies-and-stars");
});

app.get("/profile", (req: Request, res: Response) => {
  res.render("profile");
});

app.get("/private-movie-detail", (req: Request, res: Response) => {
  res.render("private-movie-detail");
});

app.get("/private-star-detail", (req: Request, res: Response) => {
  res.render("private-star-detail");
});

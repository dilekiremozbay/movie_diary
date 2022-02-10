import { Application, Router } from "express";
import { MovieAndStarController } from "../controllers/movieAndStarController";
import { UserController } from "../controllers/userController";

import { validateJWTMiddleware } from "../middlewares/authorizer";

export function registerRoutes(app: Application) {
  const userController = new UserController();
  const movieAndStarController = new MovieAndStarController();

  // setup routes
  const router = Router();

  // unauthorized endpoints
  router.get("/login", userController.login);
  router.post("/login", userController.loginPOST);
  router.get("/register", userController.register);
  router.post("/register", userController.registerPOST);

  // authorized endpoints
  router.use(validateJWTMiddleware);

  router.get("/", movieAndStarController.listingPage);
  router.get("/logout", userController.logout);
  router.get("/movie-add", movieAndStarController.addMovie);
  router.post("/movie-add", movieAndStarController.addMoviePOST);

  router.get("/star-add", movieAndStarController.addStar);
  router.post("/star-add", movieAndStarController.addStarPOST);

  app.use(router);
}

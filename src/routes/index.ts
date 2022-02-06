import { Application, Router } from "express";
import { MovieController } from '../controllers/movieController';
import { UserController } from "../controllers/userController";
import { validateJWTMiddleware } from '../middlewares/authorizer';

export function registerRoutes(app: Application) {
  const userController = new UserController();
  const movieController = new MovieController();

  app.get("/register", userController.register);
  app.post("/register", userController.registerPOST);
  app.get("/", userController.login);

  // setup routes
  const router = Router();
  
  // unauthorized endpoints
  router.post("/login", userController.loginPOST);

  // authorized endpoints
  router.use(validateJWTMiddleware);
  router.get("/me", userController.me);
  router.get("/movies", movieController.list);

  app.use("/api", router);
}

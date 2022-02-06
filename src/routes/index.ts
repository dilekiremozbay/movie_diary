import { Application, Router } from "express";
import { MovieController } from '../controllers/movieController';
import { UserController } from "../controllers/userController";
import { validateJWTMiddleware } from '../middlewares/authorizer';

export function registerRoutes(app: Application) {
  const userController = new UserController();
  const movieController = new MovieController();

  app.get("/register", userController.register);
  app.post("/register", userController.registerPOST);
  app.get("/login", userController.login);

  const router = Router();

  router.get("/", movieController.listingPage);

  app.use(router);

  // setup routes
  const apiRouter = Router();
  
  // unauthorized endpoints
  apiRouter.post("/login", userController.loginPOST);

  // authorized endpoints
  apiRouter.use(validateJWTMiddleware);
  apiRouter.get("/me", userController.me);
  apiRouter.get("/movies", movieController.list);

  app.use("/api", apiRouter);
}

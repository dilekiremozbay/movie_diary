import { Application } from "express";
import { UserController } from "../controllers/userController";

export function registerRoutes(app: Application) {
  const userController = new UserController();

  app.get("/register", userController.register);
  app.post("/register", userController.registerPOST);
  app.get("/", userController.login);
  app.post("/login", userController.loginPOST);
}

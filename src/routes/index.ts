import { Application } from "express";
import { UserController } from "../controllers/userController";
//import { PhotoController } from "../controllers/photoController";
import * as express from "express";
import { Router } from "express";

export function registerRoutes(app: Application) {
  const userController = new UserController();
  //const photoController = new PhotoController();

  app.get("/register", userController.register);
  app.post("/register", userController.registerPOST);
  app.get("/", userController.login);
  app.post("/login", userController.loginPOST);
  //app.get("/photos", photoController.list);
  //app.get("/publicdiary", photoController.upload);
  app.get("/profile", userController.profile);
  //app.post("/publicdiary", photoController.uploadPhotoPOST);
  //app.get("/publicdiary/:id", photoController.photoID);
}

// const router: Router = express.Router();
// router.get("/photos", getAllPhotos);
// router.post("/photos", createPhoto);
// router.get("/photos/:id", getPhotoById);
// export default router;

import { Application, Router } from "express";
import { MovieAndStarController } from "../controllers/movieAndStarController";
import { SocialLoginController } from "../controllers/socialLoginController";
import { UserController } from "../controllers/userController";
import { validateJWTMiddleware } from "../middlewares/authorizer";

export function registerRoutes(app: Application) {
  const userController = new UserController();
  const movieAndStarController = new MovieAndStarController();
  const socialLoginController = new SocialLoginController();

  // setup routes
  const router = Router();

  // unauthorized endpoints
  router.get("/login", userController.login);
  router.post("/login", userController.loginPOST);
  router.get("/register", userController.register);
  router.post("/register", userController.registerPOST);

  router.get(
    "/auth/facebook",
    socialLoginController.authWithFacebookMiddleware
  );

  router.get(
    "/auth/facebook/callback",
    socialLoginController.authWithFacebookCallbackMiddleware
  );
  router.get(
    "/auth/facebook/set-cookie",
    socialLoginController.setSocialLoginUserCookie
  );

  router.get("/auth/google", socialLoginController.authWithGoogleMiddleware);

  router.get(
    "/auth/google/callback",
    socialLoginController.authWithGoogleCallbackMiddleware
  );
  router.get(
    "/auth/google/set-cookie",
    socialLoginController.setSocialLoginUserCookie
  );

  // authorized endpoints
  router.use(validateJWTMiddleware);

  router.get("/", movieAndStarController.listingPage);
  router.get("/profile", userController.profile);
  router.get("/logout", userController.logout);
  router.get("/movie-add", movieAndStarController.addMovie);
  router.post("/movie-add", movieAndStarController.addMoviePOST);

  router.get("/star-add", movieAndStarController.addStar);
  router.post("/star-add", movieAndStarController.addStarPOST);

  router.get("/movie/:id", movieAndStarController.movieDetails);
  router.get("/movie/:id/delete", movieAndStarController.deleteMovie);
  router.get("/movie/:id/like", movieAndStarController.likeMovieOrStar);
  router.post("/movie/:id/comments", movieAndStarController.addComment);

  router.get("/star/:id", movieAndStarController.starDetails);
  router.get("/star/:id/delete", movieAndStarController.deleteStar);
  router.get("/star/:id/like", movieAndStarController.likeMovieOrStar);
  router.post("/star/:id/comments", movieAndStarController.addComment);

  app.use(router);
}

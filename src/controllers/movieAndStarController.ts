import { Request, Response } from "express";
import { isAnyArrayBuffer } from "util/types";
import { Movie } from "../entity/Movie";
import { Star } from "../entity/Star";

export class MovieAndStarController {
  async listingPage(req: Request, res: Response) {
    const movies = await Movie.find({
      where: {
        isPrivate: false,
      },
      order: {
        createdAt: "DESC",
      },
    });
    const stars = await Star.find({
      where: {
        isPrivate: false,
      },
      order: {
        createdAt: "DESC",
      },
    });
    const moviesAndStars: (Movie | Star)[] = movies.concat(stars as any[]);

    moviesAndStars.sort((b, a) => {
      return a.createdAt.getTime() - b.createdAt.getTime();
    });

    res.render("movies-and-stars", {
      moviesAndStars,
    });
  }

  addMovie(req: Request, res: Response) {
    res.render("movie-add");
  }

  async addMoviePOST(req: Request, res: Response) {
    const movie = Movie.create(req.body) as unknown as Movie;

    movie.isPrivate = req.body.private === "on";
    movie.createdBy = req.user;

    await movie.save();

    res.redirect("/");
  }

  addStar(req: Request, res: Response) {
    res.render("star-add");
  }

  async addStarPOST(req: Request, res: Response) {
    const star = Star.create(req.body) as unknown as Star;

    star.isPrivate = req.body.private === "on";
    star.createdBy = req.user;

    await star.save();

    res.redirect("/");
  }
}

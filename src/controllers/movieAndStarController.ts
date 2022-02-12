import { Request, Response } from "express";
import { DateTime } from "luxon";
import { Entity } from "typeorm";
import { Comment } from "../entity/Comment";
import { Like } from "../entity/Like";
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

    for (const movie of movies) {
      movie.likes = await Like.find({
        where: {
          entityId: movie.id,
          entityType: "movie",
        },
      });
    }

    for (const star of stars) {
      star.likes = await Like.find({
        where: {
          entityId: star.id,
          entityType: "movie",
        },
      });
    }

    const moviesAndStars: (Movie | Star)[] = movies.concat(stars as any[]);

    moviesAndStars.sort((b, a) => {
      return a.createdAt.getTime() - b.createdAt.getTime();
    });

    res.render("movies-and-stars", {
      moviesAndStars,
      user: req.user,
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

  async movieDetails(req: Request, res: Response) {
    const currentUser = req.user;
    const movie = await Movie.findOne(req.params.id);

    if (!movie) {
      return res.sendStatus(404);
    }

    if (movie.isPrivate && movie.createdBy.id !== currentUser.id) {
      return res.sendStatus(403);
    }

    movie.comments = await Comment.find({
      where: {
        entityType: "movie",
        entityId: movie.id,
      },
    });

    movie.likes = await Like.find({
      where: {
        entityType: "movie",
        entityId: movie.id,
      },
    });

    res.render("movie-star-detail", {
      type: "movie",
      entity: movie,
      user: req.user,
      createdAt: DateTime.fromJSDate(movie.createdAt).toFormat("dd/MM/yyyy"),
    });
  }

  async starDetails(req: Request, res: Response) {
    const currentUser = req.user;
    const star = await Star.findOne(req.params.id);

    if (!star) {
      return res.sendStatus(404);
    }

    if (star.isPrivate && star.createdBy.id !== currentUser.id) {
      return res.sendStatus(403);
    }

    star.comments = await Comment.find({
      where: {
        entityType: "star",
        entityId: star.id,
      },
    });

    star.likes = await Like.find({
      where: {
        entityType: "star",
        entityId: star.id,
      },
    });

    res.render("movie-star-detail", {
      type: "star",
      entity: star,
      user: req.user,
      createdAt: DateTime.fromJSDate(star.createdAt).toFormat("dd/MM/yyyy"),
    });
  }

  async deleteMovie(req: Request, res: Response) {
    const movie = await Movie.findOne(req.params.id);

    if (movie.createdBy.id !== req.user.id) {
      return res.sendStatus(403);
    }

    await movie.remove();

    res.redirect(req.headers["referer"] || "/");
  }

  async deleteStar(req: Request, res: Response) {
    const star = await Star.findOne(req.params.id);

    if (star.createdBy.id !== req.user.id) {
      return res.sendStatus(403);
    }

    await star.remove();

    res.redirect(req.headers["referer"] || "/");
  }

  async likeMovieOrStar(req: Request, res: Response) {
    const entityType = req.path.includes("/movie/") ? "movie" : "star";
    const entityId = Number(req.params.id);

    const like = await Like.findOne({
      where: {
        entityId,
        entityType,
        user: req.user,
      },
    });

    if (like) {
      await like.remove();
    } else {
      const nlike = new Like();

      nlike.entityId = entityId;
      nlike.entityType = entityType;
      nlike.user = req.user;

      await nlike.save();
    }

    res.redirect(req.headers["referer"] || "/");
  }

  async addComment(req: Request, res: Response) {
    const entityType = req.path.includes("/movie/") ? "movie" : "star";
    const entityId = Number(req.params.id);
    const body = req.body;

    if (!body.comment) {
      return res.status(400).send("Please enter the comment");
    }

    const comment = new Comment();

    comment.user = req.user;
    comment.comment = body.comment;
    comment.entityType = entityType;
    comment.entityId = entityId;

    await comment.save();

    res.redirect(`/${entityType}/${entityId}`);
  }
}

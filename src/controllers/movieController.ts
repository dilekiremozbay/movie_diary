import { Request, Response } from 'express';
import { Movie } from '../entity/Movie';

export class MovieController {
  listingPage(req: Request, res: Response) {
    res.render('movies-and-stars')
  }

  async list(req: Request, res: Response) {
    const movies = await Movie.find();

    res.json(movies);
  }
}

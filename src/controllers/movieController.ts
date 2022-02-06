import { Request, Response } from 'express';
import { Movie } from '../entity/Movie';

export class MovieController {
  async list(req: Request, res: Response) {
    const movies = await Movie.find();

    res.json(movies);
  }
}

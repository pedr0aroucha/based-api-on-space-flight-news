import { Request, Response } from 'express';

import { SeedArticlesService } from '../../services/Articles/SeedArticlesService';

export class SeedArticlesController {
	constructor(private readonly seedArticlesService: SeedArticlesService) {}

	async handle(req: Request, res: Response): Promise<Response> {
		try {
			const limit = req.query.limit ? Number(req.query.limit) : 10;
			return res.json(await this.seedArticlesService.execute(limit));
		} catch (err: any) {
			console.error(err);
			return res
				.status(400)
				.json({ error: err.message || 'Unexpected Error' });
		}
	}
}

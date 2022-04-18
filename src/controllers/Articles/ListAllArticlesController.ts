import { Request, Response } from 'express';

import { ListAllArticlesService } from '../../services/Articles/ListAllArticlesService';

export class ListAllArticlesController {
	constructor(
		private readonly listAllArticlesService: ListAllArticlesService
	) {}

	async handle(req: Request, res: Response): Promise<Response> {
		try {
			const page = req.query.page
				? parseInt(req.query.page as string)
				: 1;

			const limit = req.query.limit
				? parseInt(req.query.limit as string)
				: 10;

			const start = req.query.start
				? parseInt(req.query.start as string)
				: limit * page - limit;

			return res.json(
				await this.listAllArticlesService.execute(limit, start)
			);
		} catch (err: any) {
			return res
				.status(400)
				.json({ error: err.message || 'Unexpected Error' });
		}
	}
}

import { Request, Response } from 'express';

import { ListByIdArticlesService } from '../../services/Articles/ListByIdArticlesService';

export class ListByIdArticlesController {
	constructor(
		private readonly listByIdArticlesService: ListByIdArticlesService
	) {}

	async handle(req: Request, res: Response): Promise<Response> {
		try {
			const id = Number(req.params.id);
			return res.json(await this.listByIdArticlesService.execute(id));
		} catch (err: any) {
			return res
				.status(400)
				.json({ error: err.message || 'Unexpected Error' });
		}
	}
}

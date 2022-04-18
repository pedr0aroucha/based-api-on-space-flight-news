import { Request, Response } from 'express';

import { UpdateArticlesService } from '../../services/Articles/UpdateArticlesService';

export class UpdateArticlesController {
	constructor(
		private readonly updateArticlesService: UpdateArticlesService
	) {}

	async handle(req: Request, res: Response): Promise<Response> {
		try {
			const id = Number(req.params.id);

			const article = req.body;

			const events = article.events || [];
			const launches = article.launches || [];

			Reflect.deleteProperty(article, 'events');
			Reflect.deleteProperty(article, 'launches');

			await this.updateArticlesService.execute(
				article,
				id,
				events,
				launches
			);

			return res.status(202).send();
		} catch (err: any) {
			return res
				.status(400)
				.json({ error: err.message || 'Unexpected Error' });
		}
	}
}

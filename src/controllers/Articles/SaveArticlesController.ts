import { Request, Response } from 'express';

import { SaveArticlesService } from '../../services/Articles/SaveArticlesService';

export class SaveArticlesController {
	constructor(private readonly saveArticlesService: SaveArticlesService) {}

	async handle(req: Request, res: Response): Promise<Response> {
		try {
			const article = req.body;

			const events = article.events || [];
			const launches = article.launches || [];

			Reflect.deleteProperty(article, 'events');
			Reflect.deleteProperty(article, 'launches');

			await this.saveArticlesService.execute(article, events, launches);

			return res.status(201).send();
		} catch (err: any) {
			console.error({ err });
			return res
				.status(400)
				.json({ error: err.message || 'Unexpected Error' });
		}
	}
}

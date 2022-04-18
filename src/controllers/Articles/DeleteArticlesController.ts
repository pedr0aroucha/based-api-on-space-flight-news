import { Request, Response } from 'express';

import { DeleteArticlesService } from '../../services/Articles/DeleteArticlesService';

export class DeleteArticlesController {
	constructor(
		private readonly deleteArticlesService: DeleteArticlesService
	) {}

	async handle(req: Request, res: Response): Promise<Response> {
		try {
			const id = Number(req.params.id);

			await this.deleteArticlesService.execute(id);

			return res.status(204).send();
		} catch (err: any) {
			return res
				.status(400)
				.json({ error: err.message || 'Unexpected Error' });
		}
	}
}

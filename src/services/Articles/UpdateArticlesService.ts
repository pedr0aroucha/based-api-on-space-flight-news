import { Article, Event, Launch, PrismaClient } from '@prisma/client';

export class UpdateArticlesService {
	constructor(private readonly prisma: PrismaClient) {}

	public async execute(
		article: Article,
		id: number,
		events: Event[],
		launches: Launch[]
	): Promise<void> {
		const articleDoesNotExists = !(await this.prisma.article.findUnique({
			where: { id },
		}));

		if (articleDoesNotExists) {
			throw new Error('Article not found.');
		}

		for await (const event of events) {
			const eventDoesNotExists = !(await this.prisma.event.findUnique({
				where: { id: event.id },
			}));

			if (eventDoesNotExists) {
				throw new Error(`Event ${event.id} not found.`);
			}

			await this.prisma.event.update({
				where: {
					id: event.id,
				},
				data: {
					provider: event.provider,
				},
			});
		}

		for await (const launch of launches) {
			const launchDoesNotExists = !(await this.prisma.launch.findUnique({
				where: { id: launch.id },
			}));

			if (launchDoesNotExists) {
				throw new Error(`Launch ${launch.id} not found.`);
			}

			await this.prisma.launch.update({
				where: {
					id: launch.id,
				},
				data: {
					provider: launch.provider,
				},
			});
		}

		await this.prisma.article.update({
			where: { id },
			data: article,
		});

		return;
	}
}

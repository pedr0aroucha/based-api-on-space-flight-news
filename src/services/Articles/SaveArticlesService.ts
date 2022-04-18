import { Article, Event, Launch, PrismaClient } from '@prisma/client';

export class SaveArticlesService {
	constructor(private readonly prisma: PrismaClient) {}

	public async execute(
		article: Article,
		events: Event[],
		launches: Launch[]
	): Promise<void> {
		const articleAlreadyExists = await this.prisma.article.findUnique({
			where: {
				title: article.title,
			},
		});

		if (articleAlreadyExists) {
			throw new Error('Article already exists.');
		}

		const createdArticle = await this.prisma.article.create({
			data: article,
		});

		for await (const event of events) {
			const createdEvent = await this.prisma.event.create({
				data: event,
			});

			await this.prisma.articleOnEvent.create({
				data: {
					articleId: createdArticle.id,
					eventId: createdEvent.id,
				},
			});
		}

		for await (const launch of launches) {
			const createdLaunch = await this.prisma.launch.create({
				data: launch,
			});

			await this.prisma.articleOnLaunch.createMany({
				data: {
					articleId: createdArticle.id,
					launchId: createdLaunch.id,
				},
			});
		}

		return;
	}
}

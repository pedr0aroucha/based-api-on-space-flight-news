import { Article, PrismaClient } from '@prisma/client';

export class ListByIdArticlesService {
	constructor(private readonly prisma: PrismaClient) {}

	public async execute(id: number): Promise<Article> {
		const article = await this.prisma.article.findUnique({
			where: { id },
			include: {
				events: {
					select: {
						events: true,
					},
				},
				launches: {
					select: {
						launches: true,
					},
				},
			},
		});

		if (!article) {
			throw new Error('Article not found.');
		}

		const result = {
			...article,
			events: article.events.map((event) => event.events),
			launches: article.launches.map((launch) => launch.launches),
		};

		return result;
	}
}

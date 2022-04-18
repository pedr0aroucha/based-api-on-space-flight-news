import { Article, PrismaClient } from '@prisma/client';

export class ListAllArticlesService {
	constructor(private readonly prisma: PrismaClient) {}

	public async execute(limit: number, start: number): Promise<Article[]> {
		const articles = await this.prisma.article.findMany({
			take: limit,
			skip: start,
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

		const result = [];

		for await (const article of articles) {
			result.push({
				...article,
				events: article.events.map((event) => event.events),
				launches: article.launches.map((launch) => launch.launches),
			});
		}

		return result;
	}
}

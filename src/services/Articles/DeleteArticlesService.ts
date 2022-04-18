import { Article, PrismaClient } from '@prisma/client';

export class DeleteArticlesService {
	constructor(private readonly prisma: PrismaClient) {}

	public async execute(id: number): Promise<void> {
		const article = await this.prisma.article.findUnique({ where: { id } });

		if (!article) {
			throw new Error('Article not found.');
		}

		await this.prisma.articleOnEvent.deleteMany({
			where: { articleId: id },
		});

		await this.prisma.articleOnLaunch.deleteMany({
			where: { articleId: id },
		});

		await this.prisma.event.deleteMany({
			where: { articles: { some: { articleId: id } } },
		});

		await this.prisma.launch.deleteMany({
			where: { articles: { some: { articleId: id } } },
		});

		await this.prisma.article.delete({
			where: { id },
		});

		return;
	}
}

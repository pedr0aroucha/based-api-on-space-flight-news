import { PrismaClient, Event } from '@prisma/client';
import axios from 'axios';

export class SeedArticlesService {
	constructor(private readonly prisma: PrismaClient) {}

	async execute(limit: number) {
		const response = await axios.get(
			`https://api.spaceflightnewsapi.net/v3/articles?_limit=${limit}`
		);

		const articles = response.data;

		let count = 0;

		for await (const article of articles) {
			const articleAlreadyExists = await this.prisma.article.findUnique({
				where: {
					id: article.id,
				},
			});

			if (articleAlreadyExists) {
				continue;
			}

			await this.prisma.article.create({
				data: {
					id: article.id,
					imageUrl: article.imageUrl,
					newsSite: article.newsSite,
					publishedAt: article.publishedAt,
					summary: article.summary,
					title: article.title,
					url: article.url,
					featured: article.featured,
				},
			});

			for await (let event of article.events) {
				const eventExists = await this.prisma.event.findUnique({
					where: { id: event.id },
				});

				let eventId;

				if (eventExists) {
					eventId = event.id;
				} else {
					const createdEvent = await this.prisma.event.create({
						data: event,
					});

					eventId = createdEvent.id;
				}

				await this.prisma.articleOnEvent.create({
					data: {
						articleId: article.id,
						eventId: eventId,
					},
				});
			}

			for await (const launch of article.launches) {
				const launchExists = await this.prisma.launch.findUnique({
					where: { id: launch.id },
				});

				let launchId;

				if (launchExists) {
					launchId = launch.id;
				} else {
					const createdLaunch = await this.prisma.launch.create({
						data: launch,
					});

					launchId = createdLaunch.id;
				}
				await this.prisma.articleOnLaunch.createMany({
					data: {
						articleId: article.id,
						launchId: launchId,
					},
				});
			}

			count++;
		}

		return {
			created: count,
		};
	}
}

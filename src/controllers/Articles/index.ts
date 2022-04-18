import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

import { ListAllArticlesController } from './ListAllArticlesController';
import { SaveArticlesController } from './SaveArticlesController';
import { ListByIdArticlesController } from './ListByIdArticlesController';
import { UpdateArticlesController } from './UpdateArticlesController';
import { DeleteArticlesController } from './DeleteArticlesController';
import { SeedArticlesController } from './SeedArticlesController';

import { ListAllArticlesService } from '../../services/Articles/ListAllArticlesService';
import { SaveArticlesService } from '../../services/Articles/SaveArticlesService';
import { ListByIdArticlesService } from '../../services/Articles/ListByIdArticlesService';
import { UpdateArticlesService } from '../../services/Articles/UpdateArticlesService';
import { DeleteArticlesService } from '../../services/Articles/DeleteArticlesService';
import { SeedArticlesService } from '../../services/Articles/SeedArticlesService';

export const controllers = {
	listAllArticlesController: new ListAllArticlesController(
		new ListAllArticlesService(prisma)
	),
	saveArticlesController: new SaveArticlesController(
		new SaveArticlesService(prisma)
	),
	listByIdArticlesController: new ListByIdArticlesController(
		new ListByIdArticlesService(prisma)
	),
	updateArticlesController: new UpdateArticlesController(
		new UpdateArticlesService(prisma)
	),
	deleteArticlesController: new DeleteArticlesController(
		new DeleteArticlesService(prisma)
	),
	seedArticlesController: new SeedArticlesController(
		new SeedArticlesService(prisma)
	),
};

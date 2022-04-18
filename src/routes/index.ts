import { Router } from 'express';

import { controllers } from '../controllers/Articles/';

const articleRoutes = Router();

const {
	listAllArticlesController,
	saveArticlesController,
	listByIdArticlesController,
	updateArticlesController,
	deleteArticlesController,
	seedArticlesController,
} = controllers;

articleRoutes.get('/', async (req, res) => {
	return await listAllArticlesController.handle(req, res);
});

articleRoutes.post('/', async (req, res) => {
	return await saveArticlesController.handle(req, res);
});

articleRoutes.get('/:id', async (req, res) => {
	return await listByIdArticlesController.handle(req, res);
});

articleRoutes.put('/:id', async (req, res) => {
	return await updateArticlesController.handle(req, res);
});

articleRoutes.delete('/:id', async (req, res) => {
	return await deleteArticlesController.handle(req, res);
});

articleRoutes.post('/seed', async (req, res) => {
	return await seedArticlesController.handle(req, res);
});

export { articleRoutes };

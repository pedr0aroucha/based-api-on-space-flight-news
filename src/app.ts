import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import { articleRoutes } from './routes';

class App {
	app: express.Application;

	constructor() {
		this.app = express();

		this.middlewares();
		this.routes();
	}

	middlewares() {
		this.app.use(express.json());
		this.app.use(morgan('dev'));
		this.app.use(cors());
	}

	routes() {
		this.app.get('/', (req, res) => {
			return res.json({
				message: 'Back-end Challenge 2021 🏅 - Space Flight News',
			});
		});
		this.app.use('/articles', articleRoutes);
	}
}

export default new App().app;

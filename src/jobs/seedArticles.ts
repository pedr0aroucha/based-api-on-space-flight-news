import cron from 'node-cron';

import axios from 'axios';

cron.schedule('0 20 * * *', function () {
	axios
		.post('http://127.0.0.1:8080/articles/seed')
		.then(() => {
			console.log('job: seed-articles');
		})
		.catch(() => {});
});

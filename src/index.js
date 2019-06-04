const Routes = require('./routes')
const path = require('path');

module.exports = (app, express) => {
	const router = express.Router();
	Routes.forEach(route => {
		route(router)
	})

	//Set default api prefix
	app.use('/api', router);

	// 404 not found
	app.use('*', (req, res) => {
		res.sendFile(path.join(__dirname+'/pages/404.html'));
	});
}
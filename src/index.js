const Routes = require('./routes')
const path = require('path');

module.exports = (app, express) => {
	const router = express.Router();
	
	//Set default api path
	app.use('/api', router);
	
	Routes.forEach(route => {
		route(router)
	})

	app.get('/', (req, res) => {
		res.send({ver: '1.0.0'})
	})
	
	// 404 not found
	app.use('*', (req, res) => {
		res.sendFile(path.join(__dirname+'/pages/404.html'));
	});
}

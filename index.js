const express = require('express');
const bodyParser = require('body-parser')
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//Set Global store if not exists
app.use('', (req,res,next) => {
	if(!global.contacts){
		global.contacts = []
	}
	next();
})

//api routes
require('./src')(app, express);

// starting the server
app.listen(3001, () => {
  console.log('listening on port 3001');
});

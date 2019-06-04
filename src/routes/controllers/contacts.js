module.exports = (router) => {
	router.get('/contacts', (req, res) => {
	    res.send(global.contacts); 
	});

	router.post('/contact', (req, res) => {
	    global.contacts.push(req.body)
	    res.send(global.contacts);  
	});

	router.param('name', (req, res, next, name) => {
	    // do validation on name here
	    console.log('doing name validations on ' + name);

	    if(name.length < 3) res.status(200).send({ error: 'Name must be valid'})
	    next(); 
	});

	router.get('/contacts/:name', (req, res) => {
    	res.send(global.contacts.filter(contact => contact.name === req.params.name));
	});

	router.delete('/contacts/:id', (req, res) => {
		const doc = global.contacts.find(contact => parseInt(contact.id) === parseInt(req.params.id));
		if(doc) {
			global.contacts = global.contacts.filter(contact => parseInt(contact.id) !== parseInt(req.params.id));
		}
    	res.send(doc || {error: 'not found'});
	});

	router.put('/contacts/:id', (req, res) => {
		const pos = global.contacts.map((contact) => parseInt(contact.id)).indexOf(parseInt(req.params.id));
		if(pos > -1) {
			global.contacts[pos] = req.body
		}
		res.send(pos > -1 ? req.body : {error: 'not found'})
	});

	router.patch('/contacts/:id', (req, res) => {
		const pos = global.contacts.map((contact) => parseInt(contact.id)).indexOf(parseInt(req.params.id));
		if(pos > -1) {
			global.contacts[pos] = {
				...global.contacts[pos],
				...req.body
			}
		}
		res.send(pos > -1 ? global.contacts[pos] : {error: 'not found'})
	});
}
const express = require('express');
const multer = require('multer');
const speech = require('./speech');

const upload = multer({ dest: './res/' });

module.exports = ({ config }) => {
	let api = express.Router();

	// mount the facets resource

	api.route('/speech').post(upload.single('speech'), speech.upload);

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({ 'ayy': 'lmao' });
	});

	return api;
}

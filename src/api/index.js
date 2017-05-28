import { Router } from 'express';
import multer from 'multer';
import speech from './speech';

const upload = multer({ dest: './res/' });

export default ({ config, db }) => {
	let api = Router();

	// mount the facets resource

	api.route('/speech').post(upload.single('speech'), speech.upload);

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({ 'ayy': 'lmao' });
	});

	return api;
}

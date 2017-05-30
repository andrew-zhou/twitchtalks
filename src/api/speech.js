const firebase = require('firebase');
const s3client = require('../lib/s3_client');

const upload = (req, res) => {
	// Upload to S3
	const {file} = req;
	const {filename, originalname} = file;
	const {uid, title} = req.headers;

	if (!uid) {
		return res.status(403).json({error: 'No user provided.'});
	}

	if (!file) {
		return res.status(400).json({error: 'No speech file found.'});
	}

	const fileNameByPeriod = originalname.split(".");
	const fileExtension = fileNameByPeriod[fileNameByPeriod.length - 1];
	const s3name = `${filename}.${fileExtension}`;

	s3client.upload(s3name, file, () => {
		// Create in firebase
		const url = s3client.getUrl(s3name);
		const db = firebase.database();
		const key = db.ref().child('speeches').push().key;

		db.ref(`speeches/${key}`).set({
			name: title,
			uid,
			url,
		});
		res.status(200).json({url});
	}, (err) => {
		res.status(404).json({error: err});
	});
};

module.exports = {
	upload,
};

import firebase from 'firebase';
import s3client from '../lib/s3_client';

const upload = (req, res) => {
	// Upload to S3
	const {file} = req;
	const {originalname} = file;
	const {uid} = req.headers;

	if (!uid) {
		return res.status(403).json({error: 'No user provided.'});
	}

	if (!file) {
		return res.status(400).json({error: 'No speech file found.'});
	}

	s3client.upload(originalname, file, () => {
		// Create in firebase
		const url = s3client.getUrl(originalname);
		const db = firebase.database();
		const key = db.ref().child('speeches').push().key;
		db.ref(`speeches/${key}`).set({
			name: file.originalname,
			uid: req.headers.uid,
			url,
		});
		res.status(200).json({url});
	}, (err) => {
		res.status(404).json({error: err});
	});
};

export default {
	upload,
};

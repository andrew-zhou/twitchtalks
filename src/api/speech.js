import s3client from '../lib/s3_client';

const upload = (req, res) => {
	// Upload to S3
	const {file} = req;

	if (!file) {
		return res.status(400).json({error: 'No speech file found.'});
	}

	Object.keys(file).forEach(key => console.log(`${key}: ${file[key]}`));

	s3client.upload(file.originalname, file, () => {
		// TODO: Create in Firebase
		res.json({success: true});
	}, (err) => {
		res.status(404).json({error: err});
	});
};

export default {
	upload,
};

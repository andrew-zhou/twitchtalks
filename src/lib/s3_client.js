const s3 = require('s3');

const bucket = 'jabber-speeches';

const options = {
	accessKeyId: 'AKIAJACKKFVYMO6WTNHQ',
	secretAccessKey: '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',
	region: 'us-east-2',
	signatureVersion: 'v3', // Stuff breaks if we use v2 or v4
}

const client = s3.createClient({
	s3Options: options,
});

const upload = (key, file, onSuccess, onError) => {
	const params = {
		localFile: file.path,
		s3Params: {
			Bucket: bucket,
			Key: key,
			ContentType: file.mimetype,
		},
	};
	const uploader = client.uploadFile(params);
	uploader.on('error', err => {
		console.log(err);
		onError(err);
	});
	uploader.on('end', onSuccess);
};

const getUrl = key => s3.getPublicUrl(bucket, key, options.region);

module.exports = {
	client,
	upload,
	getUrl,
};

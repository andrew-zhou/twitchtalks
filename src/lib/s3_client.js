const s3 = require('s3');

const bucket = 'jabber-speeches';

const client = s3.createClient({
	s3Options: {
		accessKeyId: 'AKIAIRBNCMD3IDQQTGGQ',
    secretAccessKey: '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',
    region: 'us-east-2',
		signatureVersion: 'v3',
	},
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

const getUrl = key => s3.getPublicUrlHttp(bucket, key);

module.exports = {
	client,
	upload,
	getUrl,
};

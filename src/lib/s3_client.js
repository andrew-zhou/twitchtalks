import s3 from 's3';

const client = s3.createClient({
	maxAsyncS3: 20,     // this is the default
  s3RetryCount: 3,    // this is the default
  s3RetryDelay: 1000, // this is the default
  multipartUploadThreshold: 20971520, // this is the default (20 MB)
  multipartUploadSize: 15728640, // this is the default (15 MB)
	s3Options: {
		accessKeyId: 'AKIAJIL226QYNOQT6FXA',
    secretAccessKey: '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',
    region: 'us-east-2',
		signatureVersion: 'v3',
	},
});

const upload = (key, file, onSuccess, onError) => {
	const params = {
		localFile: file.path,
		s3Params: {
			Bucket: 'jabber-speeches',
			Key: key,
		},
	};
	const uploader = client.uploadFile(params);
	uploader.on('error', err => {
		console.log('wtf is this shit');
		console.log(err);
		onError(err);
	});
	uploader.on('end', onSuccess);
};

export default {
	client,
	upload,
};

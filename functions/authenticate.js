const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')();

const validateFirebaseIdToken = (req, res, next) => {
  cors(req, res, () => {
    const idToken = req.headers.authorization;
    admin.auth().verifyIdToken(idToken).then(decodedIdToken => {
      console.log('ID Token correctly decoded', decodedIdToken);
      req.uid = decodedIdToken.uid;
      next();
    }).catch(error => {
      console.error('Error while verifying Firebase ID token:', error);
      res.status(403).send('Unauthorized');
    });
  });
}

exports.authenticate = validateFirebaseIdToken;

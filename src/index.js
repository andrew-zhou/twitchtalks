import http from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import initializeDb from './db';
import middleware from './middleware';
import api from './api';
import config from './config.json';
import firebase from 'firebase';

const firebaseConfig = {
	apiKey: "AIzaSyB4scCuErPLd0mnfOmw7MvVxUUj-jiPMXs",
	authDomain: "twitchtalks-72534.firebaseapp.com",
	databaseURL: "https://twitchtalks-72534.firebaseio.com",
	projectId: "twitchtalks-72534",
	storageBucket: "twitchtalks-72534.appspot.com",
	messagingSenderId: "1077739307518"
};

firebase.initializeApp(firebaseConfig);

let app = express();
app.server = http.createServer(app);

// logger
app.use(morgan('dev'));

// 3rd party middleware
app.use(cors({
	exposedHeaders: config.corsHeaders
}));

app.use(bodyParser.json({
	limit : config.bodyLimit
}));

// connect to db
initializeDb( db => {

	// internal middleware
	app.use(middleware({ config, db }));

	// api router
	app.use('/api', api({ config, db }));

	app.server.listen(process.env.PORT || config.port, () => {
		console.log(`Started on port ${app.server.address().port}`);
	});
});

export default app;

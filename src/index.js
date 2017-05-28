const http = require("http");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const middleware = require("./middleware");
const api = require("./api");
const config = require("./config.json");
const firebase = require("firebase");

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

// internal middleware
app.use(middleware({ config }));

// api router
app.use('/api', api({ config }));

app.server.listen(process.env.PORT || config.port, () => {
	console.log(`Started on port ${app.server.address().port}`);
});

module.exports = app;

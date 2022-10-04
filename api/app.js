const express = require('express');
const db = require('./db');

const app = express();

app.get('/', (req, res) => {
	res.status(200).json({
		status: 'succes',
		data: {
			message: 'Succesful response',
		},
	});
});

app.get('/database', (req, res) => {
	db.query('SELECT * from dilemmas', (err, data) => {
		if (err) console.log(err);
		console.log(data);
		res.status(200).json({
			status: 'succes',
			data: {
				data,
			},
		});
	});
});

module.exports = app;

const { json } = require('body-parser');
const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

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

app.post('/dilemma', (req, res) => {
	const { question, answer1, answer2 } = req.body;
	db.query(`INSERT INTO dilemmas(question, answer1, answer2) VALUES('${question}', '${answer1}', '${answer2}')`, (err, data) => {
		if (err) console.log(err);
		res.status(200).json({
			status: 200,
			message: 'The dilemma was added to the db',
		});
	});
});

app.post('/answer', (req, res) => {
	const { answer, questionId } = req.body;
	const answerString = `${answer}count`;
	console.log(answer, questionId);
	db.query(`UPDATE dilemmas set ${answerString} = ${answerString}+1 WHERE id=${questionId}`, (err, data) => {
		if (err) console.log(err);

		res.status(200).json({
			status: 'succes',
		});
	});
});

module.exports = app;

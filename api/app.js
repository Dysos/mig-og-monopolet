const { json } = require('body-parser');
const express = require('express');
const cors = require('cors');
const db = require('./db');
const app = express();

app.use(cors());
app.use(express.json());

const validateDilemma = (req, res, next) => {
	const { question, answer1, answer2, dateString } = req.body;
	if (question === undefined || answer1 === undefined || answer2 === undefined || dateString === undefined) {
		res.status(200).json({
			status: 'failed',
			message: 'Missing one or more parameters',
		});
	}
	if (question.length === 0 || answer1.length === 0 || answer2.length === 0 || dateString.length === 0) {
		res.status(200).json({
			status: 'failed',
			message: 'Missing one or more parameters',
		});
	}
	next();
};

app.post('/api/v1/dilemmas', validateDilemma);

app.get('/api/v1/dilemmas', (req, res) => {
	db.query('SELECT * from dilemmas ORDER BY id DESC', (err, data) => {
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

app.post('/api/v1/dilemmas', (req, res) => {
	const { question, answer1, answer2, dateString } = req.body;
	db.query(`INSERT INTO dilemmas(question, answer1, answer2, createdAt) VALUES('${question}', '${answer1}', '${answer2}', '${dateString}')`, (err, data) => {
		if (err) console.log(err);
		res.status(200).json({
			status: 'succes',
			message: 'The dilemma was added to the db',
		});
	});
});

app.post('/api/v1/answers', (req, res) => {
	const { answer, questionId } = req.body;
	const answerString = `${answer}count`;
	db.query(`UPDATE dilemmas set ${answerString} = ${answerString}+1 WHERE id=${questionId}`, (err, data) => {
		if (err) console.log(err);

		res.status(200).json({
			status: 'succes',
			message: 'The answer was added to the right dilemma',
		});
	});
});

module.exports = app;

const db = require('./db');

exports.validateDilemma = (req, res, next) => {
	const { question, answer1, answer2, dateString } = req.body;
	if (question === undefined || answer1 === undefined || answer2 === undefined || dateString === undefined) {
		res.status(200).json({
			status: 'failed',
			message: 'Missing one or more parameters',
		});
	} else if (question.length === 0 || answer1.length === 0 || answer2.length === 0 || dateString.length === 0) {
		res.status(200).json({
			status: 'failed',
			message: 'Missing one or more parameters',
		});
	}
	next();
};

exports.getAllDilemmas = (req, res) => {
	db.query('SELECT * from dilemmas ORDER BY id DESC', (err, data) => {
		if (err) console.log(err);
		res.status(200).json({
			status: 'succes',
			data: {
				data,
			},
		});
	});
};

exports.createDilemma = (req, res) => {
	const { question, answer1, answer2, dateString } = req.body;
	db.query(`INSERT INTO dilemmas(question, answer1, answer2, createdAt) VALUES('${question}', '${answer1}', '${answer2}', '${dateString}')`, (err, data) => {
		if (err) console.log(err);
		res.status(200).json({
			status: 'succes',
			message: 'The dilemma was added to the db',
		});
	});
};

exports.newAnswer = (req, res) => {
	const { answer, questionId } = req.body;
	const answerString = `${answer}count`;
	db.query(`UPDATE dilemmas set ${answerString} = ${answerString}+1 WHERE id=${questionId}`, (err, data) => {
		if (err) console.log(err);
		res.status(200).json({
			status: 'succes',
			message: 'The answer was added to the right dilemma',
		});
	});
};

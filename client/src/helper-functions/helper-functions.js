exports.parseDilemmaData = (dilemmaArray) => {
	return dilemmaArray.map((dilemma) => {
		const { question, id, answer1, answer1count, answer2, answer2count, createdAt } = dilemma;
		const answers = [
			{
				text: answer1,
				count: answer1count,
			},
			{
				text: answer2,
				count: answer2count,
			},
		];
		return {
			question: question,
			id: id,
			answers: answers,
			createdAt: createdAt,
		};
	});
};

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

exports.getTimeDifference = (createdAt) => {
	const time = new Date(createdAt);
	const timeDiff = new Date().getTime() - time.getTime();
	const seconds = Math.floor(timeDiff / 1000);
	const minutes = Math.floor(seconds / 60);
	const hours = Math.floor(minutes / 60);
	const days = Math.floor(hours / 24);
	return days >= 1 ? `${days}d` : hours >= 1 ? `${hours}t` : minutes >= 1 ? `${minutes}m` : `${seconds}s`;
};

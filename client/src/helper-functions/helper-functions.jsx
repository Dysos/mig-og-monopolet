export function parseDilemmaData(dilemmaArray) {
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
}

export function getTimeDifference(createdAt) {
	const time = new Date(createdAt);
	const timeDiff = new Date().getTime() - time.getTime();
	const seconds = Math.floor(timeDiff / 1000);
	const minutes = Math.floor(seconds / 60);
	const hours = Math.floor(minutes / 60);
	const days = Math.floor(hours / 24);
	return days >= 1 ? `${days}d` : hours >= 1 ? `${hours}t` : minutes >= 1 ? `${minutes}m` : `${seconds}s`;
}

export function getAnswersArray(dilemma, totalAnswers, addDilemmaAnswer) {
	return dilemma.answers.map((answer, index) => {
		let answerWidth = answer.count > 0 ? Math.round((answer.count / totalAnswers) * 100) : 10;
		answerWidth = answerWidth < 10 ? 10 : answerWidth;
		const answerClass = answerWidth >= 50 ? 'dilemma__answer--most-popular' : 'dilemma__answer--neutral';
		return window.localStorage.getItem(`${dilemma.id}`) === 'true' ? (
			<div className={`dilemma__answer dilemma__answer--true ${answerClass}`} style={{ width: `${answerWidth}%` }} key={index}>
				{answer.text} ({answer.count})
			</div>
		) : (
			<div
				className="dilemma__answer"
				key={index}
				onClick={() => {
					addDilemmaAnswer(`answer${index + 1}`, dilemma.id);
				}}
			>
				{answer.text}
			</div>
		);
	});
}

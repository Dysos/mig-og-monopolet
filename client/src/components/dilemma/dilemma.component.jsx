const Dilemma = ({ dilemmas }) => {
	const questions = dilemmas.map((dilemma) => {
		const answers = dilemma.answers.map((answer) => (
			<div>
				{answer.text}: {answer.count}
			</div>
		));
		return (
			<div>
				<h2>{dilemma.question}</h2>
				{answers}
			</div>
		);
	});
	return <div>{questions}</div>;
};

export default Dilemma;

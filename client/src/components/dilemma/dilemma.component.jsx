import './dilemma.style.scss';

const Dilemma = ({ dilemmas, addAnswer }) => {
	const questions = dilemmas.map((dilemma) => {
		const answers = dilemma.answers.map((answer, index) => {
			if (answer.text.length > 0) {
				return (
					<div
						className="dilemma__answer"
						onClick={() => {
							addAnswer(`answer${index + 1}`, dilemma.id);
						}}
					>
						{answer.text}: {answer.count}
					</div>
				);
			}
		});
		return (
			<div className="dilemma">
				<h2 className="dilemma__text">{dilemma.question}</h2>
				<div className="answers-container">{answers}</div>
			</div>
		);
	});
	return <div className="dilemma-container">{questions}</div>;
};

export default Dilemma;

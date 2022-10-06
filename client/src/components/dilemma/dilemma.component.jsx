import './dilemma.style.scss';
import { getTimeDifference } from '../../helper-functions/helper-functions';

const Dilemma = ({ dilemmas, addDilemmaAnswer }) => {
	const questions = dilemmas.map((dilemma) => {
		const totalAnswers = dilemma.answers.map((answer) => answer.count).reduce((cur, acc) => cur + acc, 0);
		const answers = dilemma.answers.map((answer, index) => {
			if (answer.text.length > 0) {
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
			}
		});

		const timeString = getTimeDifference(dilemma.createdAt);
		return (
			<div className="dilemma" key={dilemma.id}>
				<p className="dilemma__time">{timeString} </p>
				<h2 className="dilemma__text">{dilemma.question}</h2>
				<div className="answers-container">{answers}</div>
			</div>
		);
	});
	return <div className="dilemma-container">{questions}</div>;
};

export default Dilemma;

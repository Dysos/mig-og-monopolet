import './dilemma.style.scss';
import { getTimeDifference, getAnswersArray } from '../../helper-functions/helper-functions';

const Dilemma = ({ dilemmas, addDilemmaAnswer }) => {
	const questions = dilemmas.map((dilemma) => {
		const totalAnswers = dilemma.answers.map((answer) => answer.count).reduce((cur, acc) => cur + acc, 0);
		const answers = getAnswersArray(dilemma, totalAnswers, addDilemmaAnswer);
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

import './modal.style.scss';

const Modal = ({ addNewDilemma, changeModal }) => {
	const sendDilemma = () => {
		const question = document.querySelector('.modal__text-input').value;
		let answers = [];
		answers.push(document.querySelectorAll('.modal__answer-input')[0].value);
		answers.push(document.querySelectorAll('.modal__answer-input')[1].value);
		if (question.length === 0 || answers[0].length === 0 || answers[1].length === 1) {
			alert('Udfyld alle felterne');
			return;
		}
		const now = new Date();
		// const dateString = `${now.slice(0, 10)} ${now.slice(11, 19)}`;
		const dateString = `${now.getFullYear()}-${('0' + (now.getMonth() + 1)).slice(-2)}-${('0' + now.getDate()).slice(-2)} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

		addNewDilemma(question, answers, dateString);
	};

	return (
		<div className="modal__overlay">
			<svg xmlns="http://www.w3.org/2000/svg" className="modal__close" onClick={changeModal} viewBox="0 0 20 20" fill="currentColor">
				<path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
			</svg>
			<div className="modal">
				<h3 className="modal__heading">Dit dilemma</h3>
				<textarea className="modal__text-input"></textarea>
				<h3 className="modal__heading">Svarmuligheder</h3>
				<div className="modal__answer-container">
					<input type="text" className="modal__answer-input"></input>
					<input type="text" className="modal__answer-input"></input>
				</div>
				<button
					className="modal__button"
					onClick={() => {
						sendDilemma();
					}}
				>
					Indsend dilemma
				</button>
			</div>
		</div>
	);
};

export default Modal;

import { useState, useEffect } from 'react';
import './modal.style.scss';

const Modal = ({ addNewDilemma, changeModal }) => {
	const [showModal, setShowModal] = useState(true);
	const sendDilemma = () => {
		const question = document.querySelector('.modal__text-input').value;
		let answers = [];
		answers.push(document.querySelectorAll('.modal__answer-input')[0].value);
		answers.push(document.querySelectorAll('.modal__answer-input')[1].value);
		addNewDilemma(question, answers);
		changeModal();
	};

	return (
		<div className="modal__overlay">
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

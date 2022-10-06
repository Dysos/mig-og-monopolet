import { useState, useEffect } from 'react';
import Dilemma from './components/dilemma/dilemma.component';
import AddDilemma from './components/add-dilemma/add-dilemma.component';
import Modal from './components/modal/modal.component';
import './App.scss';

const App = () => {
	const [showingModal, setShowingModal] = useState(false);
	const [dilemmas, setDilemmas] = useState([]);

	const addNewDilemma = (question, answers, dateString) => {
		fetch('http://localhost:4000/api/v1/dilemmas', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				question: question,
				answer1: answers[0],
				answer2: answers[1],
				dateString: dateString,
			}),
		}).then(() => {
			getData();
			changeModal();
		});
	};

	const getData = () => {
		fetch('http://localhost:4000/api/v1/dilemmas')
			.then((res) => res.json())
			.then((res) =>
				setDilemmas(
					res.data.data.map((singleQuestion) => {
						return {
							question: singleQuestion.question,
							id: singleQuestion.id,
							answers: [
								{
									text: singleQuestion.answer1,
									count: singleQuestion.answer1count,
								},
								{
									text: singleQuestion.answer2,
									count: singleQuestion.answer2count,
								},
								{
									text: singleQuestion.answer3,
									count: singleQuestion.answer3count,
								},
								{
									text: singleQuestion.answer4,
									count: singleQuestion.answer4count,
								},
							],
							createdAt: singleQuestion.createdAt,
						};
					})
				)
			);
	};
	const addAnswer = (answer, questionId) => {
		fetch('http://localhost:4000/api/v1/answers', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				answer: answer,
				questionId: questionId,
			}),
		}).then(() => {
			window.localStorage.setItem(`${questionId}`, 'true');
			getData();
		});
	};

	const changeModal = () => {
		setShowingModal(!showingModal);
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<div className="container">
			<Dilemma dilemmas={dilemmas} addAnswer={addAnswer} />
			{showingModal ? <Modal addNewDilemma={addNewDilemma} changeModal={changeModal} /> : <AddDilemma changeModal={changeModal} />}
		</div>
	);
};

export default App;

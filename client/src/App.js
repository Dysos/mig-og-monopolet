import { useState, useEffect } from 'react';
import Dilemma from './components/dilemma/dilemma.component';
import AddDilemma from './components/add-dilemma/add-dilemma.component';
import Modal from './components/modal/modal.component';
import { parseDilemmaData } from './helper-functions/helper-functions';
import './App.scss';

const App = () => {
	const [showingModal, setShowingModal] = useState(false);
	const [dilemmas, setDilemmas] = useState([]);

	const addNewDilemma = async (question, answers, dateString) => {
		await fetch('http://localhost:4000/api/v1/dilemmas', {
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
		});
		getData();
		changeModal();
	};

	const getData = async () => {
		const data = await fetch('http://localhost:4000/api/v1/dilemmas');
		const dilemmas = await data.json();
		const objDilemmas = parseDilemmaData(dilemmas.data.data);
		setDilemmas(objDilemmas);
	};
	const addAnswer = async (answer, questionId) => {
		await fetch('http://localhost:4000/api/v1/answers', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				answer: answer,
				questionId: questionId,
			}),
		});
		window.localStorage.setItem(`${questionId}`, 'true');
		getData();
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

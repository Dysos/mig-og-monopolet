import './App.scss';
import { useState, useEffect } from 'react';
import Dilemma from './components/dilemma/dilemma.component';
import AddDilemma from './components/add-dilemma/add-dilemma.component';
import Modal from './components/modal/modal.component';

const App = () => {
	const [showingModal, setShowingModal] = useState(false);
	const [dilemmas, setDilemmas] = useState([
		{
			question: 'Letmælk eller sødmælk?',
			answers: [
				{
					text: 'Letmælk',
					count: 2,
				},
				{
					text: 'Sødmælk',
					count: 0,
				},
			],
		},
		{
			question: 'Kakaomælk eller juice?',
			answers: [
				{
					text: 'Kakaomælk',
					count: 9,
				},
				{
					text: 'Juice',
					count: 4,
				},
			],
		},
	]);

	const addNewDilemma = (question, answers) => {
		fetch('http://localhost:4000/dilemma', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				question: question,
				answer1: answers[0],
				answer2: answers[1],
			}),
		}).then((res) => {
			getData();
		});
	};

	const getData = () => {
		fetch('http://localhost:4000/database')
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
						};
					})
				)
			);
	};
	const addAnswer = (answer, questionId) => {
		console.log('Addanser ID: ', questionId);
		fetch('http://localhost:4000/answer', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				answer: answer,
				questionId: questionId,
			}),
		}).then((res) => getData());
	};

	const changeModal = () => {
		setShowingModal(!showingModal);
		console.log('setting showing modal ', showingModal);
	};

	useEffect(() => {
		fetch('http://localhost:4000/database')
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
						};
					})
				)
			);
	}, []);
	return (
		<div className="container">
			<Dilemma dilemmas={dilemmas} addAnswer={addAnswer} />
			<AddDilemma changeModal={changeModal} />
			{showingModal ? <Modal addNewDilemma={addNewDilemma} changeModal={changeModal} /> : <div></div>}
		</div>
	);
};

export default App;

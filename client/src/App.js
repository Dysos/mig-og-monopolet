import './App.scss';
import { useState, useEffect } from 'react';
import Dilemma from './components/dilemma/dilemma.component';
import AddDilemma from './components/add-dilemma/add-dilemma.component';

const App = () => {
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
			<AddDilemma />
		</div>
	);
};

export default App;

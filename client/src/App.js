import './App.css';
import { useState, useEffect } from 'react';
import Dilemma from './components/dilemma/dilemma.component';

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
	useEffect(() => {
		fetch('http://localhost:4000/database')
			.then((res) => res.json())
			.then((res) => console.log(res));
	}, []);
	return (
		<div>
			Hello from the App
			<Dilemma dilemmas={dilemmas} />
		</div>
	);
};

export default App;

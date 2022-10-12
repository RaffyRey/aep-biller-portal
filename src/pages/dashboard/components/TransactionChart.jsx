import { Box } from '@mui/material';
import {
	ArcElement,
	BarElement,
	CategoryScale,
	Chart as ChartJS,
	Legend,
	LinearScale,
	LineElement,
	PointElement,
	RadialLinearScale,
	Tooltip,
} from 'chart.js';
import React from 'react';
import { Line } from 'react-chartjs-2';

export default function TransactionChart({ chartData }) {
	ChartJS.register(
		LinearScale,
		RadialLinearScale,
		CategoryScale,
		BarElement,
		PointElement,
		LineElement,
		ArcElement,
		Legend,
		Tooltip,
	);

	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: 'top',
			},
		},
		scales: {
			y: {
				beginAtZero: true,
			},
		},
	};

	return (
		<Box
			borderRadius={2}
			height='100%'
			width='100%'
			display='flex'
			justifyContent='center'
			flexDirection='row'>
			<Box maxWidth='1020px' width='100%' height='150px'>
				<Line data={chartData} options={options} />
			</Box>
		</Box>
	);
}

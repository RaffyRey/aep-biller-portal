import Chart from 'react-apexcharts';

import React from 'react';

const ChartTable = ({ labels, chartData }) => {
	const state = {
		options: {
			chart: {
				id: 'basic-line',
			},
			xaxis: {
				categories: labels,
			},
			colors: ['#0e3553'],
			stroke: {
				show: true,
				curve: 'smooth',
				lineCap: 'butt',
				colors: undefined,
				width: 2,
				dashArray: 0,
			},
		},
		series: [
			{
				name: 'series-1',
				data: chartData,
			},
		],
	};

	return (
		<Chart
			options={state.options}
			series={state.series}
			type='line'
			width='1000'
			height='500'
		/>
	);
};

export default ChartTable;

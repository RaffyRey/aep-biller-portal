import { Box } from '@mui/material';
import React, { useState } from 'react';
import { WebLayout } from '../../components';
import { useSummaryParamQuery } from '../../features/biller/billerApi';

export default function Summary() {
	const [page, setPage] = useState(1);

	const { data, isLoading } = useSummaryParamQuery(page);

	console.log(data);

	return (
		<WebLayout>
			<Box
				width='100%'
				height='100%'
				display='flex'
				alignItems='center'
				justifyContent='center'>
				{isLoading ? <h1>Loading...</h1> : <h1>Summary</h1>}
			</Box>
		</WebLayout>
	);
}

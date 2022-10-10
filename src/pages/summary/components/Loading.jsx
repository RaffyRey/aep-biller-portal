import { Skeleton, TableCell } from '@mui/material';
import React from 'react';

const Loading = () => {
	return (
		<>
			<TableCell>
				<Skeleton variant='rectangular' width='100%' height={500} />
			</TableCell>
			<TableCell>
				<Skeleton variant='rectangular' width='100%' height={500} />
			</TableCell>
			<TableCell>
				<Skeleton variant='rectangular' width='100%' height={500} />
			</TableCell>
			<TableCell>
				<Skeleton variant='rectangular' width='100%' height={500} />
			</TableCell>
			<TableCell>
				<Skeleton variant='rectangular' width='100%' height={500} />
			</TableCell>
			<TableCell>
				<Skeleton variant='rectangular' width='100%' height={500} />
			</TableCell>
		</>
	);
};

export default Loading;

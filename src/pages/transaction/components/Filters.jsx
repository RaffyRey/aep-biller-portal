import SearchIcon from '@mui/icons-material/Search';
import { Box, Button } from '@mui/material';
import React, { useState } from 'react';

import { getFormattedDateTwo } from '../../../utilities/formatDate';

export default function Filters() {
	const [group, setGroup] = useState('');
	const [dateRange, setDateRange] = useState();
	const [searchValue, setSearchValue] = useState('');

	const filter = (e) => {
		e.preventDefault();
		console.log(dateRange[0]);
		console.log(getFormattedDateTwo(dateRange[0]));
		console.log(getFormattedDateTwo(dateRange[1]));
	};

	return (
		<Box
			width='100%'
			paddingY={1}
			display='flex'
			alignItems='center'
			justifyContent='space-between'>
			{/* filter biller */}
			<Box
				width={600}
				height={35}
				display='flex'
				flexDirection='row'
				alignItems='center'>
				{/* <SelectPicker style={{ width: 140, marginRight: 4, height: '100%' }} />
				<DateRangePicker
					style={{ width: 240, marginRight: 4, height: '100%' }}
					format='yyyy-MM-dd'
					onChange={(value) => setDateRange(value)}
				/> */}
				<Button
					variant='contained'
					sx={{
						marginLeft: '4px',
						height: '100%',
						padding: 0,
						backgroundColor: 'rgb(14, 53, 83)',
					}}
					onClick={filter}>
					Filter
				</Button>
			</Box>
			{/* end of filter biller */}
			{/* <Divider orientation='vertical' sx={{ marginX: '8px' }} /> */}
			{/* start of search by biller ref. */}
			<Box
				width={300}
				height='35px'
				display='flex'
				flexDirection='row'
				alignItems='center'
				justifyContent='flex-end'>
				{/* <AutoComplete
					style={{ marginRight: 4 }}
					data={data}
					onChange={(value) => setSearchValue(value)}
					placeholder='Search Biller ref...'
				/> */}
				<Button
					variant='contained'
					color='primary'
					onClick={() => alert(searchValue)}
					sx={{
						background: 'rgb(14, 53, 83)',
						height: '100%',
						color: '#fff',
					}}>
					<SearchIcon />
				</Button>
			</Box>
			{/* end of search by biller ref. */}
		</Box>
	);
}

const data = [
	'Eugenia',
	'Bryan',
	'Linda',
	'Nancy',
	'Lloyd',
	'Alice',
	'Julia',
	'Albert',
	'Louisa',
	'Lester',
	'Lola',
	'Lydia',
	'Hal',
	'Hannah',
	'Harriet',
	'Hattie',
	'Hazel',
	'Hilda',
];

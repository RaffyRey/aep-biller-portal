import SearchIcon from '@mui/icons-material/Search';
import {
	Box,
	Button,
	FormControl,
	IconButton,
	InputLabel,
	Select,
	TextField,
	Typography,
} from '@mui/material';
import React from 'react';

export default function Filters({
	searchOnChange,
	onFilter,
	searchValue,
	searchOnClick,
	selectValue,
	selectOnChange,
	selectChildren,
}) {
	return (
		<Box
			width='100%'
			height={60}
			padding={1}
			display='flex'
			alignItems='center'
			justifyContent='space-between'>
			{/* filter biller */}
			<Typography variant='h4' color='#333'>
				Summary
			</Typography>
			<Box height='100%' display='flex' alignItems='center' zIndex={1000}>
				<Box display='flex' alignItems='center' height='100%'>
					<FormControl sx={{ m: 1, width: 150 }} size='small'>
						<InputLabel id='demo-select-small'>Biller</InputLabel>
						<Select
							labelId='demo-select-small'
							id='demo-select-small'
							value={selectValue}
							label='Biller'
							onChange={selectOnChange}>
							{selectChildren}
						</Select>
					</FormControl>
					<Button variant='contained' sx={{ marginX: 1 }} onClick={onFilter}>
						Filter
					</Button>
					<Button variant='contained' color='warning'>
						Export
					</Button>
				</Box>
			</Box>
			{/* end of search by biller ref. */}
		</Box>
	);
}

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
import DatePicker from 'react-datepicker';

export default function Filters({
	searchOnChange,
	pickerStartDate,
	pickerEndDate,
	pickerOnchange,
	onFilter,
	searchValue,
	searchOnClick,
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
				Profile
			</Typography>
			<Box height='100%' display='flex' alignItems='center' zIndex={1000}>
				<Box display='flex' alignItems='center' height='100%'>
					<DatePicker
						selectsRange={true}
						startDate={pickerStartDate}
						endDate={pickerEndDate}
						onChange={pickerOnchange}
						placeholderText='Date Range'
						isClearable={true}
						className='input-datePicker'
					/>
					<Button variant='contained' sx={{ marginX: 1 }} onClick={onFilter}>
						Filter
					</Button>
				</Box>
				<Box display='flex' alignItems='center' height='100%'>
					<TextField
						label='Search'
						id='outlined-size-small'
						size='small'
						value={searchValue}
						onChange={searchOnChange}
					/>
					<IconButton color='primary' onClick={searchOnClick}>
						<SearchIcon />
					</IconButton>
				</Box>
			</Box>
			{/* end of search by biller ref. */}
		</Box>
	);
}

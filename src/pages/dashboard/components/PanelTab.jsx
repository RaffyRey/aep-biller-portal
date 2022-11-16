import { Box, IconButton, Tab, Tabs } from '@mui/material';
import React from 'react';
import DatePicker from 'react-datepicker';
import { FaRegCalendarAlt } from 'react-icons/fa';

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
}

const PanelTab = ({
	tabValue,
	tabOnChange,
	tabDaily,
	tabMonthly,
	tabYearly,
	tabToDate,
	startDate,
	endDate,
	dataPickerOnChange,
	datePickerOnClick,
}) => {
	return (
		<React.Fragment>
			<Tabs
				value={tabValue}
				onChange={tabOnChange}
				aria-label='basic tabs example'
				variant='scrollable'
				scrollButtons
				allowScrollButtonsMobile>
				<Tab label='Daily' {...a11yProps(0)} onClick={tabDaily} />
				<Tab label='Monthly' {...a11yProps(1)} onClick={tabMonthly} />
				<Tab label='Yearly' {...a11yProps(2)} onClick={tabYearly} />
				<Tab label='To Date' {...a11yProps(3)} onClick={tabToDate} />
			</Tabs>
			<Box
				height='50px'
				width='fit-content'
				display='flex'
				flexDirection='row'
				alignItems='center'
				paddingY={1}
				marginLeft={2}>
				<DatePicker
					selectsRange={true}
					startDate={startDate}
					endDate={endDate}
					onChange={dataPickerOnChange}
					// isClearable={true}
					className='input-datePicker'
				/>
				<IconButton color='primary' onClick={datePickerOnClick}>
					<FaRegCalendarAlt style={{ width: 18, height: 18 }} />
				</IconButton>
			</Box>
		</React.Fragment>
	);
};

export default PanelTab;

import React from 'react';
import { StyledTableCell, StyledTableRow } from '../../../style/style';

const DataRow = ({
	dataKey,
	dataOne,
	dataTwo,
	dataThree,
	dataFour,
	dataFive,
	dataSix,
}) => {
	return (
		<StyledTableRow
			key={dataKey}
			sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
			<StyledTableCell align='center' sx={{ fontSize: '14px' }}>
				{dataOne}
			</StyledTableCell>
			<StyledTableCell align='center' sx={{ fontSize: '14px' }}>
				{dataTwo}
			</StyledTableCell>
			<StyledTableCell align='center' sx={{ fontSize: '14px' }}>
				{dataThree}
			</StyledTableCell>
			<StyledTableCell align='center' sx={{ fontSize: '14px' }}>
				{dataFour}
			</StyledTableCell>
			<StyledTableCell align='center' sx={{ fontSize: '14px' }}>
				{dataFive}
			</StyledTableCell>
			<StyledTableCell align='center' sx={{ fontSize: '14px' }}>
				{dataSix}
			</StyledTableCell>
		</StyledTableRow>
	);
};

export default DataRow;

import React from "react";
import { StyledTableCell } from "../../../style/style";

const DataRow = ({
  dataOne,
  dataTwo,
  dataThree,
  dataFour,
  dataFive,
  dataSix,
}) => {
  return (
    <>
      <StyledTableCell align="center" sx={{ fontSize: "14px" }}>
        {dataOne}
      </StyledTableCell>
      <StyledTableCell align="center" sx={{ fontSize: "14px" }}>
        {dataTwo}
      </StyledTableCell>
      <StyledTableCell align="center" sx={{ fontSize: "14px" }}>
        {dataThree}
      </StyledTableCell>
      <StyledTableCell align="center" sx={{ fontSize: "14px" }}>
        {dataFour}
      </StyledTableCell>
      <StyledTableCell align="center" sx={{ fontSize: "14px" }}>
        {dataFive}
      </StyledTableCell>
      <StyledTableCell align="center" sx={{ fontSize: "14px" }}>
        {dataSix}
      </StyledTableCell>
    </>
  );
};

export default DataRow;

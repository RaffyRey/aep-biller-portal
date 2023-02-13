import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

import { DateRangePicker } from "react-date-range";

export default function Filters({
  searchOnChange,
  selectValue,
  selectOnChange,
  selectChildren,
  dateRange,
  pickerOnchange,
  onFilter,
  searchValue,
  searchOnClick,
  title,
}) {
  const [openFilter, setOpenFilter] = React.useState(false);
  // const [animation, setAnimation] = React.useState(false);

  return (
    <Box
      width="100%"
      height={openFilter ? "auto" : 60}
      padding={1}
      overflow="hidden"
    >
      <Box
        component="div"
        height={50}
        width="100%"
        display="flex"
        justifyContent="space-between"
      >
        <Typography
          variant="h5"
          textAlign="left"
          color="#333"
          marginTop={2}
          fontFamily="Montserrat"
          fontWeight={700}
        >
          {title}
        </Typography>
        <Box height="50px" display="flex" alignItems="center" zIndex={1000}>
          <Box display="flex" alignItems="center" height="100%">
            <TextField
              label="Search"
              id="outlined-size-small"
              size="small"
              color="error"
              value={searchValue}
              onChange={searchOnChange}
            />
            <Button
              variant="outlined"
              color="error"
              onClick={searchOnClick}
              sx={{
                height: 40,
                marginLeft: 1,
              }}
            >
              <SearchIcon />
            </Button>
          </Box>
          <Box display="flex" alignItems="center" height="100%">
            <Button
              variant="contained"
              color="error"
              sx={{ marginX: 1 }}
              onClick={() => {
                setOpenFilter(!openFilter);
              }}
            >
              Filter
            </Button>
          </Box>
        </Box>
      </Box>
      {/* filter box */}
      <Box
        // className={`animate__animated animate__${animation}`}
        component="div"
        paddingY={1}
        width="100%"
        height="auto"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        {/* select and search filter */}
        <Box height="fit-content" zIndex={1000} display="flex" gap={1}>
          <Box>
            <DateRangePicker
              onChange={pickerOnchange}
              showSelectionPreview={true}
              moveRangeOnFirstSelection={false}
              months={2}
              ranges={dateRange}
              direction="horizontal"
              rangeColors={["#c1272d"]}
              color="#c1272d"
            />
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="flex-start"
            width={200}
            gap={2}
          >
            <FormControl sx={{ minWidth: 120 }} size="small" fullWidth>
              <InputLabel id="demo-select-small">Biller</InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={selectValue}
                label="Biller"
                color="primary"
                onChange={selectOnChange}
              >
                {selectChildren}
              </Select>
            </FormControl>
            <Button variant="contained" color="primary" onClick={onFilter}>
              Apply Filter
            </Button>
            <Button variant="contained" color="primary">
              Generate Report
            </Button>
            <Button variant="outlined" color="primary">
              View Report
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

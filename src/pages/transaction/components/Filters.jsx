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
import DatePicker from "react-datepicker";

export default function Filters({
  searchOnChange,
  selectValue,
  selectOnChange,
  selectChildren,
  pickerStartDate,
  pickerEndDate,
  pickerOnchange,
  onFilter,
  searchValue,
  searchOnClick,
}) {
  const [openFilter, setOpenFilter] = React.useState(false);

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
          variant="h4"
          color="#333"
          height={50}
          alignItems="center"
          display="flex"
        >
          Transactions
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
              onClick={() => setOpenFilter(!openFilter)}
            >
              Filter
            </Button>
          </Box>
        </Box>
      </Box>
      {/* filter box */}
      <Box
        component="div"
        width="100%"
        height="auto"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        {/* select and search filter */}
        <Box
          height="70px"
          zIndex={1000}
          display="flex"
          alignItems="center"
          gap={1}
        >
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small">Biller</InputLabel>
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              value={selectValue}
              label="Biller"
              color="error"
              onChange={selectOnChange}
            >
              {selectChildren}
            </Select>
          </FormControl>
          <Box width={250}>
            <DatePicker
              selectsRange={true}
              startDate={pickerStartDate}
              endDate={pickerEndDate}
              onChange={pickerOnchange}
              placeholderText="Date Range"
              isClearable={true}
              className="input-datePicker"
            />
          </Box>
          <Button variant="contained" color="error" onClick={onFilter}>
            Apply Filter
          </Button>
        </Box>
        <Box component="div" display="flex" alignItems="center" gap={1}>
          <Button variant="contained" color="error">
            Generate Report
          </Button>
          <Button variant="outlined" color="error">
            View Report
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

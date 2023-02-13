import { Box, Divider, Typography } from "@mui/material";
import PropTypes from "prop-types";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export const TransactionData = ({
  children,
  panelvalue,
  countData,
  amountData,
}) => {
  return (
    <Box
      borderBottom="1px solid #e6e6e6"
      height={150}
      width="100%"
      display="flex"
      flexDirection="column"
    >
      <Box
        width="100%"
        height="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        padding={0}
      >
        <Box
          width="100%"
          sx={{ borderBottom: 1, borderColor: "divider" }}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {children}
        </Box>

        <TabPanel value={panelvalue} index={0}>
          <DataCard countData={countData} amountData={amountData} />
        </TabPanel>
        <TabPanel value={panelvalue} index={1}>
          <DataCard countData={countData} amountData={amountData} />
        </TabPanel>
        <TabPanel value={panelvalue} index={2}>
          <DataCard countData={countData} amountData={amountData} />
        </TabPanel>
        <TabPanel value={panelvalue} index={3}>
          <DataCard countData={countData} amountData={amountData} />
        </TabPanel>
      </Box>
    </Box>
  );
};

function DataCard({ countData, amountData }) {
  const DataCardBox = ({ children }) => {
    return (
      <Box
        width={250}
        paddingX={2}
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        borderRadius={2}
      >
        {children}
      </Box>
    );
  };

  return (
    <Box width="100%" height="100%" display="flex" padding={0}>
      <DataCardBox>
        <Typography
          variant="subtitle1"
          fontSize={14}
          fontWeight={700}
          color="#333"
        >
          Transaction Count
        </Typography>
        <Typography variant="subtitle1" fontWeight={700} color="secondary">
          {countData}
        </Typography>
      </DataCardBox>
      <Divider orientation="vertical" flexItem />
      <DataCardBox>
        <Typography
          variant="subtitle1"
          fontSize={14}
          fontWeight={700}
          color="#333"
        >
          Transaction Amount
        </Typography>
        <Typography variant="subtitle1" fontWeight={700} color="secondary">
          {amountData}
        </Typography>
      </DataCardBox>
    </Box>
  );
}

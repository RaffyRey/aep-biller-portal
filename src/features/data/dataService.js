import axios from "axios";

// const BILLER_DATA_API = process.env.REACT_APP_BILLER_PROD;
const BILLER_DATA_API = process.env.REACT_APP_BILLER_STG;
const PROFILE_API = `${BILLER_DATA_API}/biller_group_admin`;
const DATA_ENDPOINT_API = `${BILLER_DATA_API}/biller_group_admin/`;

// get BILLER profile
const getBiller = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  // send get request to server
  const response = await axios.get(PROFILE_API, config);
  return response.data;
};

// biller daily transaction
const getTransactionData = async (token, endpoint) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  // send get request to server
  const response = await axios.get(
    DATA_ENDPOINT_API + `total_transactions?group_by=${endpoint}`,
    config
  );
  return response.data;
};

// biller daily transaction
const getChartData = async (token, query) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  // send get request to server
  const response = await axios.get(
    DATA_ENDPOINT_API + `aggregate?${query}`,
    config
  );
  return response.data;
};

const dataService = {
  getBiller,
  getTransactionData,
  getChartData,
};

export default dataService;

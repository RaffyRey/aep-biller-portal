import axios from "axios";

const API_URI = `${process.env.REACT_APP_BILLER_PROD}/biller_group_admin/summary`;
// const API_URI = `${process.env.REACT_APP_BILLER_STG}/biller_group_admin/summary`;

const summary = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  // send get request to server
  const response = await axios.get(API_URI, config);
  return response.data;
};

const summaries = async (token, params) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  // send get request to server
  const response = await axios.get(`${API_URI}?${params}`, config);
  return response.data;
};

const summaryService = {
  summary,
  summaries,
};

export default summaryService;

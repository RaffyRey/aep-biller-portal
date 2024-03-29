import axios from "axios";

// const BILLER_DATA_API = process.env.REACT_APP_BILLER_PROD;
const BILLER_DATA_API = process.env.REACT_APP_BILLER_STG;
const DATA_ENDPOINT_API = `${BILLER_DATA_API}/biller_group_admin/transaction/`;

// biller daily transaction
const getMonitoringData = async (token, page) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  // send get request to server
  const response = await axios.get(
    DATA_ENDPOINT_API + `v2?page=${page}&group_by=day`,
    config
  );
  return response.data;
};

const monitoringService = {
  getMonitoringData,
};

export default monitoringService;

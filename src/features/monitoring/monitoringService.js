import axios from 'axios';

// const BILLER_DATA_API = process.env.REACT_APP_API_URI
const BILLER_DATA_API = process.env.REACT_APP_BILLER_PROD;
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
		config,
	);
	return response.data;
};

const dataService = {
	getMonitoringData,
};

export default dataService;

import axios from 'axios';

// const BILLER_DATA_API = process.env.REACT_APP_API_URI
const BILLER_DATA_API = process.env.REACT_APP_BILLER_PROD;
const PROFILE_API = `${BILLER_DATA_API}/biller_group_admin`;
const TRANSACTION_DAILY_API = `${BILLER_DATA_API}/biller_group_admin/`;
const TRANSACTION_MONTHLY_API = `${BILLER_DATA_API}/biller_group_admin/total_transactions?group_by=month`;
const TRANSACTION_YEARLY_API = `${BILLER_DATA_API}/biller_group_admin/total_transactions?group_by=year`;
const TRANSACTION_TODATE_API = `${BILLER_DATA_API}/biller_group_admin/total_transactions?group_by=to_date`;

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
const getDailyTransaction = async (token, param) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	// send get request to server
	const response = await axios.get(
		TRANSACTION_DAILY_API + `total_transactions?group_by=${param}`,
		config,
	);
	return response.data;
};

// biller monthly transaction
const getMonthlyTransaction = async (token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	// send get request to server
	const response = await axios.get(TRANSACTION_MONTHLY_API, config);
	return response.data;
};

// biller yearly transaction
const getYearlyTransaction = async (token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	// send get request to server
	const response = await axios.get(TRANSACTION_YEARLY_API, config);
	return response.data;
};

// biller to date transaction
const getToDateTransaction = async (token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	// send get request to server
	const response = await axios.get(TRANSACTION_TODATE_API, config);
	return response.data;
};

const dataService = {
	getBiller,
	getDailyTransaction,
	getMonthlyTransaction,
	getYearlyTransaction,
	getToDateTransaction,
};

export default dataService;

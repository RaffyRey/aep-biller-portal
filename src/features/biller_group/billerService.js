import axios from 'axios';

// const API_URI = `${process.env.REACT_APP_API_URI}/admin/auth`;
const API_URI = `${process.env.REACT_APP_BILLER_PROD}/biller_group_admin`;

const billerGroupAdmin = async (token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	// send get request to server
	const response = await axios.get(API_URI, config);
	return response.data;
};

const listings = async (token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	// send get request to server
	const response = await axios.get(API_URI + '/listings', config);
	return response.data;
};

const transactions = async (token, params) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	// send get request to server
	const response = await axios.get(
		`${API_URI}/transaction/v2?${params}`,
		config,
	);
	return response.data;
};

const billers = async (token, params) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	// send get request to server
	const response = await axios.get(`${API_URI}/biller?${params}`, config);
	return response.data;
};

const billerProfile = async (token, endpoint) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	// send get request to server
	const response = await axios.get(`${API_URI}/biller/${endpoint}`, config);
	return response.data;
};

const settlement = async (token, params) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	// send get request to server
	const response = await axios.get(`${API_URI}/settlement?${params}`, config);
	return response.data;
};

const billerService = {
	billerGroupAdmin,
	listings,
	transactions,
	billers,
	billerProfile,
	settlement,
};

export default billerService;

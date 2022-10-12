import axios from 'axios';

// const API_URI = `${process.env.REACT_APP_API_URI}/admin/auth`;
const API_URI = `${process.env.REACT_APP_BILLER_PROD}/admin/auth`;

const login = async (userdata) => {
	const response = await axios.post(API_URI, userdata);
	if (response.data) {
		localStorage.setItem('data', JSON.stringify(response.data));
	}
	return response.data;
};

const logout = async () => {
	localStorage.removeItem('data');
};

const authService = {
	login,
	logout,
};

export default authService;

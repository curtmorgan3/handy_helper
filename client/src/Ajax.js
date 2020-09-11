import axios from 'axios';
const BASE_URL = 'http://localhost:3001';

export default class Ajax{

	// Users
	static async createUser(payload){
		try {
			let response = await axios.post(`${BASE_URL}/users`, payload);
			return response.data;
		} catch (e) {
			console.error(e);
		}
	}

	static async getUserByEmail(payload){
		try {
			let response = await axios.get(`${BASE_URL}/users/email/${payload}`);
			return response.data;
		} catch (e) {
			console.error(e);
		}
	}

	static async userLogin(payload){
		try {
			let response = await axios.post(`${BASE_URL}/users/login`, payload);
			return response.data;
		} catch (e) {
			console.error(e);
		}
	}

	static async getCurrentUser(token){
		try {
			let response = await axios.get(`${BASE_URL}/users/`, {
				headers: {
					'Authorization': `Bearer ${token}`
				}
			})
			return response.data;
		} catch (e) {
			console.error(e);
		}
	}

	static async updateUser(payload){
		try {
			let token = localStorage.getItem('handy_helper_token');
			let response = await axios.put(`${BASE_URL}/users/`, payload,
				{headers: {
					'Authorization': `Bearer ${token}`
				}
			})
			return(response.data);
		} catch (e) {
			console.error(e);
		}
	}

	static async deleteUser(){
		try {
			let token = localStorage.getItem('handy_helper_token');
			let response = await axios.delete(`${BASE_URL}/users/`, 
				{ headers: {
					'Authorization': `Bearer ${token}`
				}
			});
			
			return(response.data);
		} catch (e) {
			console.error(e);
		}
	}

}
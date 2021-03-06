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

	static async getUserById(id){
		try {
			let token = localStorage.getItem('handy_helper_token');
			let response = await axios.get(`${BASE_URL}/users/${id}`,
				{headers: {
					'Authorization': `Bearer ${token}`
				}
			});
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

	static async searchHelpersBySkill(skill){
		try {
			let token = localStorage.getItem('handy_helper_token');
			let response = await axios.post(`${BASE_URL}/users/search`, { skill }, 
				{ headers: {
					'Authorization': `Bearer ${token}`
				}
			});
			
			return(response.data);
		} catch (e) {
			console.error(e);
		}
	}

	static async fetchAllHelpers(){
		try {
			let token = localStorage.getItem('handy_helper_token');
			let response = await axios(`${BASE_URL}/users/all-helpers`, 
				{ headers: {
					'Authorization': `Bearer ${token}`
				}
			});
			
			return(response.data);
		} catch (e) {
			console.error(e);
		}
	}

	// Listings
	static async createListing(body){
		try {
			let token = localStorage.getItem('handy_helper_token');
			let response = await axios.post(`${BASE_URL}/listings`, body, 
				{ headers: {
					'Authorization': `Bearer ${token}`
				}
			});
			
			return(response.data);
		} catch (e) {
			console.error(e);
			return null;
		}
	}

	static async getAllListings(){
		try {
			let token = localStorage.getItem('handy_helper_token');
			let response = await axios(`${BASE_URL}/listings`, 
				{ headers: {
					'Authorization': `Bearer ${token}`
				}
			});
			
			return(response.data);
		} catch (e) {
			return null;
			console.error(e);
		}
	}

	// Bookings
	static async createBooking(body){
		try {
			let token = localStorage.getItem('handy_helper_token');
			let response = await axios.post(`${BASE_URL}/bookings`, body, 
				{ headers: {
					'Authorization': `Bearer ${token}`
				}
			});
			
			return(response.data);
		} catch (e) {
			console.error(e);
			return null;
		}
	}

	static async getMyBookings(){
		try {
			let token = localStorage.getItem('handy_helper_token');
			let response = await axios.get(`${BASE_URL}/bookings/my-bookings`, 
				{ headers: {
					'Authorization': `Bearer ${token}`
				}
			});
			
			return(response.data);
		} catch (e) {
			console.error(e);
			return null;
		}
	}

	static async deleteBooking(id){
		try {
			let token = localStorage.getItem('handy_helper_token');
			let response = await axios.delete(`${BASE_URL}/bookings/${id}`, 
				{ headers: {
					'Authorization': `Bearer ${token}`
				}
			});
			
			return(response.data);
		} catch (e) {
			console.error(e);
			return null;
		}
	}

}
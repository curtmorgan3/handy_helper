import axios from 'axios';
const BASE_URL = 'http://localhost:3001';

export default class Ajax{

	//Users
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

	static async chargeStripe(payload){
		try {
			let response = await axios.post(`${BASE_URL}/charge`, payload, {headers:
				{
					"Content-Type": "text/plain"
				}
			});
			return(response.data);
		} catch (e) {
			console.error(e);
		}
	}

	static async updateUser(payload){
		try {
			let token = localStorage.getItem('snacks_from_scratch_user_token');
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

	static async addFavRecipe(payload){
		try {
			let token = localStorage.getItem('snacks_from_scratch_user_token');
			let response = await axios.put(`${BASE_URL}/users/add-to-favorites`, payload,
				{headers: {
					'Authorization': `Bearer ${token}`
				}
			})
			return(response.data);
		} catch (e) {
			console.error(e);
		}
	}

	static async removeFavRecipe(payload){
		try {
			let token = localStorage.getItem('snacks_from_scratch_user_token');
			let response = await axios.put(`${BASE_URL}/users/remove-from-favorites`, payload,
				{headers: {
					'Authorization': `Bearer ${token}`
				}
			})
			return(response.data);
		} catch (e) {
			console.error(e);
		}
	}

	// Recipes
	static async getAllRecipes(token){
		try {
			let response = await axios.get(`${BASE_URL}/recipes`, {
				headers: {
					'Authorization': `Bearer ${token}`
				}
			})
			return response.data;
		} catch (e) {
			console.error(e);
		}
	}

	static async getRecipeByID(ID, token){
		try {
			let response = await axios.get(`${BASE_URL}/recipes/${ID}`, {
				headers: {
					'Authorization': `Bearer ${token}`
				}
			})
			return response.data;
		} catch (e) {
			console.error(e);
		}
	}

	// Ingredients
	static async getAllIngredients(token){
		try {
			let response = await axios.get(`${BASE_URL}/ingredients`, {
				headers: {
					'Authorization': `Bearer ${token}`
				}
			})
			return response.data;
		} catch (e) {
			console.error(e);
		}
	}

	// Email
	static async sendEmail(user){
		try {
			let data = {
				name: user.name,
				email: user.email
			}
			await axios.post(`${BASE_URL}/email`, data);
		} catch (e) {
			console.error(e);
		}
	}
}
import axios from 'axios';

export async function register(email: string, password: string) {
  try {
    const response = await axios.post('https://65cd13f5dd519126b8401401.mockapi.io/signup', {
      email,
      password,
    });

    if (response.status === 201) {
      return response.data;
    } else {
      throw new Error('Registration failed');
    }
  } catch (error) {
    throw error;
  }
}
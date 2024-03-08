import axios from 'axios';

export async function login(email: string, password: string) {
  try {
    const response = await axios.post('https://65cd13f5dd519126b8401401.mockapi.io/signin', {
      email,
      password,
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Login failed');
    }
  } catch (error) {
    throw error;
  }
}
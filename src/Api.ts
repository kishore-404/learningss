import axios from "axios";

export interface User {
  id?: number;
  name: string;
  username: string;
  email: string;
}

const BASE_URL = "https://jsonplaceholder.typicode.com/users";


export const getUser = async (userId: number) => {
  const response = await axios.get<User>(`${BASE_URL}/${userId}`);
  return response.data;
};


export const updateUser = async (userId: number, userData: User) => {
  const response = await axios.put<User>(`${BASE_URL}/${userId}`, userData);
  return response.data;
};

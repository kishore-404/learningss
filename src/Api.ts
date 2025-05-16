// api.ts
import axios from "axios";

const BaseURL = import.meta.env.VITE_API_URL as string;

export interface User {
  id?: number;
  name: string;
  username: string;
  email: string;

  website: string;
  address: {
    city: string;
  };
  company: {
    name: string;
  };
}

export const fetchUsers = async () => {
  const response = await axios.get<User[]>(BaseURL);
  return response.data;
};

export const createData = (data : User)=>{
  return axios.post(`${BaseURL}`,data)
}

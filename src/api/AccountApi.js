import { API_URL } from './APIUtils';

export const getData = async () => {
  const response = await fetch(`${API_URL}/accounts`);
  const json = await response.json();
  return json;
}

export const searchData = async (name) => {
  const response = await fetch(`${API_URL}/accounts?name=${name}`);
  const json = await response.json();
  return json;
}

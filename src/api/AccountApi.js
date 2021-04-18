import { API_URL } from './APIUtils';

export const getData = async () => {
  const response = await fetch(`${API_URL}/accounts`);
  const json = await response.json();
  return json;
}

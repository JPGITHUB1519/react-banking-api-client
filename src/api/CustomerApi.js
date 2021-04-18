import { API_URL } from './APIUtils';

export async function getData() {
  const response = await fetch(`${API_URL}\\customers`);
  const json = await response.json();
  return json;
}

export async function searchData(value) {
  const response = await fetch(`${API_URL}\\customers?name=${value}`);
  const json = await response.json();
  return json;
}

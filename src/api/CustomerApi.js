import { API_URL } from './APIUtils';

export async function getCustomers() {
  const response = await fetch(`${API_URL}\\customers`);
  const json = await response.json();
  return json;
}

export async function searchCustomer(value) {
  const response = await fetch(`${API_URL}\\customers?name=${value}`);
  const json = await response.json();
  return json;
}

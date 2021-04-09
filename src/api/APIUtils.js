const API_URL = 'https://php-banking-api.herokuapp.com/api';

export async function getAccountById(id) {
  const response = await fetch(`${API_URL}/accounts/${id}`);
  const json = await response.json();
  return json;
}

export async function getCustomerById(id) {
  const response = await fetch(`${API_URL}/customers/${id}`);
  const json = await response.json();
  return json;
}

export async function getAccountsByCustomerId(id) {
  const response = await fetch(`${API_URL}/customers/${id}/accounts`);
  const json = await response.json();
  return json;
}


